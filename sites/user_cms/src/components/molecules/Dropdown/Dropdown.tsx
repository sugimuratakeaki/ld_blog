import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id: string | number;
  label: string;
  value?: any;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled && !item.divider) {
      onSelect?.(item);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: DropdownItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(item);
    }
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${className}`}>
      <div
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
      </div>
      {isOpen && (
        <div className={`dropdown-menu dropdown-menu-${align}`}>
          {items.map((item) => {
            if (item.divider) {
              return <div key={item.id} className="dropdown-divider" />;
            }
            return (
              <button
                key={item.id}
                className={`dropdown-item ${item.disabled ? 'dropdown-item-disabled' : ''}`}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                disabled={item.disabled}
                type="button"
              >
                {item.icon && <span className="dropdown-item-icon">{item.icon}</span>}
                <span className="dropdown-item-label">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};