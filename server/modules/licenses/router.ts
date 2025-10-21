/**
 * License Router
 * Handles license status, verification, and management
 */

import express, { type Request, type Response } from 'express';
import { sdk } from '../../_core/sdk';
import * as licenseService from './service';

const router = express.Router();

/**
 * GET /api/license/status
 * Get current user's license status
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const user = await sdk.authenticateRequest(req);
    const license = await licenseService.getUserLicense(user.id);

    if (!license) {
      res.status(404).json({
        error: 'No active license found',
      });
      return;
    }

    const stats = await licenseService.getLicenseStats(license.id);

    res.json({
      license: {
        id: license.id,
        plan: license.plan,
        status: license.status,
        billingPeriod: license.billingPeriod,
        validFrom: license.validFrom,
        validUntil: license.validUntil,
      },
      stats,
    });
  } catch (error: any) {
    console.error('[License] Status error:', error);
    res.status(500).json({
      error: error.message || 'Failed to get license status',
    });
  }
});

/**
 * GET /api/license/can-create-report
 * Check if user can create a new report
 */
router.get('/can-create-report', async (req: Request, res: Response) => {
  try {
    const user = await sdk.authenticateRequest(req);
    const result = await licenseService.canCreateReport(user.id);

    res.json(result);
  } catch (error: any) {
    console.error('[License] Can create report error:', error);
    res.status(500).json({
      error: error.message || 'Failed to check report creation permission',
    });
  }
});

/**
 * POST /api/license/use-report
 * Increment report usage (called when creating a report)
 */
router.post('/use-report', async (req: Request, res: Response) => {
  try {
    const user = await sdk.authenticateRequest(req);
    const result = await licenseService.canCreateReport(user.id);

    if (!result.allowed) {
      res.status(403).json({
        error: result.reason,
        license: result.license,
      });
      return;
    }

    await licenseService.incrementReportUsage(result.license!.id);

    const updatedLicense = await licenseService.getUserLicense(user.id);
    const stats = await licenseService.getLicenseStats(updatedLicense!.id);

    res.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error('[License] Use report error:', error);
    res.status(500).json({
      error: error.message || 'Failed to use report',
    });
  }
});

/**
 * GET /api/license/plans
 * Get available plans and pricing
 */
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const plans = Object.entries(licenseService.PLAN_LIMITS).map(([plan, limits]) => ({
      name: plan,
      reportsLimit: limits.reportsLimit,
      projectsLimit: limits.projectsLimit === -1 ? 'unlimited' : limits.projectsLimit,
      priceMonthly: limits.price,
      priceAnnual: limits.priceAnnual || null,
    }));

    res.json({ plans });
  } catch (error: any) {
    console.error('[License] Plans error:', error);
    res.status(500).json({
      error: error.message || 'Failed to get plans',
    });
  }
});

/**
 * POST /api/license/cancel
 * Cancel current subscription
 */
router.post('/cancel', async (req: Request, res: Response) => {
  try {
    const user = await sdk.authenticateRequest(req);
    const license = await licenseService.getUserLicense(user.id);

    if (!license) {
      res.status(404).json({
        error: 'No active license found',
      });
      return;
    }

    if (license.plan === 'START') {
      res.status(400).json({
        error: 'Cannot cancel free plan',
      });
      return;
    }

    await licenseService.cancelLicense(license.id);

    // Also cancel in Stripe if subscription exists
    if (license.stripeSubscriptionId) {
      const stripeService = await import('../payment/stripe');
      await stripeService.cancelSubscription(license.stripeSubscriptionId);
    }

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  } catch (error: any) {
    console.error('[License] Cancel error:', error);
    res.status(500).json({
      error: error.message || 'Failed to cancel subscription',
    });
  }
});

export default router;

