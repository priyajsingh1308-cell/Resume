import React, { useEffect, useRef } from 'react';

interface SectionOrderWrapperProps {
  TemplateComponent: React.ComponentType<any>;
  data: any;
  sectionOrder: string[];
  isEditing?: boolean;
  onUpdate?: (section: string, data: any) => void;
  activeSection?: string | null;
  isPDFMode?: boolean;
}

const SectionOrderWrapper: React.FC<SectionOrderWrapperProps> = ({
  TemplateComponent,
  data,
  sectionOrder,
  isEditing = false,
  onUpdate,
  activeSection,
  isPDFMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply CSS flexbox ordering to reorder sections based on sectionOrder
  useEffect(() => {
    if (!containerRef.current) return;

    // Create a delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      // Get all section elements with data-section attributes
      const sections = container.querySelectorAll('[data-section]');

      // Create a map of section IDs to their order
      const sectionOrderMap = new Map<string, number>();
      sectionOrder.forEach((id, index) => {
        sectionOrderMap.set(id, index);
      });

      // Apply CSS order to each section
      let orderIndex = 0;
      sections.forEach((section) => {
        const sectionId = section.getAttribute('data-section');
        if (sectionId && sectionOrderMap.has(sectionId)) {
          const order = sectionOrderMap.get(sectionId) ?? orderIndex;
          (section as HTMLElement).style.order = order.toString();
        } else {
          (section as HTMLElement).style.order = orderIndex.toString();
        }
        orderIndex++;
      });

      // Set display flex on parent containers
      const parentSections = container.querySelectorAll('div[style*="grid"]');
      parentSections.forEach((parent) => {
        const style = (parent as HTMLElement).style;
        if (style.display === 'grid' || style.display === '') {
          (parent as HTMLElement).style.display = 'flex';
          (parent as HTMLElement).style.flexDirection = 'column';
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [sectionOrder]);

  // Enhanced data with section order info
  const enhancedData = React.useMemo(() => ({
    ...data,
    _sectionOrder: sectionOrder,
  }), [data, sectionOrder]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <TemplateComponent
        data={enhancedData}
        sectionOrder={sectionOrder}
        isEditing={isEditing}
        onUpdate={onUpdate}
        activeSection={activeSection}
        isPDFMode={isPDFMode}
      />
    </div>
  );
};

export default SectionOrderWrapper;
