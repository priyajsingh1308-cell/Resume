// Helper function to get sections in the correct order
export const getSectionRenderOrder = (sectionOrder?: string[]): string[] => {
  if (sectionOrder && Array.isArray(sectionOrder) && sectionOrder.length > 0) {
    return sectionOrder;
  }
  return ['personalInfo', 'experience', 'education', 'skills', 'projects'];
};

// Helper function to check if a section should be rendered
export const shouldRenderSection = (
  sectionId: string,
  data: any,
  isEditing: boolean
): boolean => {
  const sectionData = data?.[sectionId];
  
  if (!sectionData) return isEditing;
  
  if (Array.isArray(sectionData)) {
    return sectionData.length > 0 || isEditing;
  }
  
  if (typeof sectionData === 'object') {
    // Check if object has any non-empty values
    return Object.values(sectionData).some(v => 
      v && (typeof v !== 'string' || v.trim() !== '')
    ) || isEditing;
  }
  
  return Boolean(sectionData) || isEditing;
};

// Helper function to check if data exists
export const hasData = (value: any): boolean => {
  if (Array.isArray(value)) return value && value.length > 0;
  return value && value.toString().trim() !== '';
};
