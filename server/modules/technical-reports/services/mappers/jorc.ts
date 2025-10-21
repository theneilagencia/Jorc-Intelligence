/**
 * JORC 2012 Mapper
 * Maps normalized.json to JORC 2012 standard structure
 */

interface NormalizedData {
  metadata?: {
    project_name?: string;
    company?: string;
    effective_date?: string;
    detected_standard?: string;
  };
  sections?: Array<{
    title?: string;
    content_text?: string;
  }>;
  resource_estimates?: Array<{
    category?: string;
    tonnage?: number;
    grade?: Record<string, number>;
    cutoff_grade?: Record<string, number>;
  }>;
  competent_persons?: Array<{
    name?: string;
    qualification?: string;
    organization?: string;
    role?: string;
  }>;
  economic_assumptions?: {
    recovery_rate?: number;
    mining_cost?: number;
    processing_cost?: number;
  };
  qa_qc?: string;
  geology?: string;
  brand?: {
    logo_s3?: string;
    company_display?: string;
  };
}

export function toStandard(n: NormalizedData) {
  const sections = n.sections || [];
  
  function findSection(titleSubstring: string) {
    for (const s of sections) {
      const title = (s.title || "").toLowerCase();
      if (title.includes(titleSubstring.toLowerCase())) {
        return s;
      }
    }
    return { title: "", content_text: "" };
  }

  const resources = n.resource_estimates || [];
  const tableRows = resources.map(r => ({
    category: r.category || "-",
    tonnage: r.tonnage || 0,
    grades: r.grade || {},
    cutoff: r.cutoff_grade || {},
  }));

  return {
    standard: "JORC 2012",
    project_name: n.metadata?.project_name || "-",
    company: n.metadata?.company || "-",
    effective_date: n.metadata?.effective_date || "-",
    competent_persons: (n.competent_persons || []).map(p => ({
      name: p.name || "-",
      qualification: p.qualification || "-",
      organization: p.organization || "-",
      role: p.role || "Competent Person",
    })),
    qa_qc: n.qa_qc || "Not specified",
    geology: n.geology || "Not specified",
    economic_assumptions: n.economic_assumptions || {},
    sections: {
      table1_section1: findSection("section 1"),
      table1_section2: findSection("section 2"),
      table1_section3: findSection("section 3"),
      table1_section4: findSection("section 4"),
    },
    resources_table: tableRows,
    _brand: {
      logo_s3: n.brand?.logo_s3,
      company_display: n.brand?.company_display || n.metadata?.company || "-",
    },
  };
}

