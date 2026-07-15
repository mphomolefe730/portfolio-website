import { useEffect, useState, type RefObject } from 'react';
import './animatedFilterNav.css';

interface AnimatedFilterNavProps {
  tabs: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  scrollRef: RefObject<HTMLElement>;
  scrollThreshold?: number;
}

function AnimatedFilterNav({
  tabs,
  activeIndex,
  onSelect,
  scrollRef,
  scrollThreshold = 30,
}: AnimatedFilterNavProps) {
  const [floating, setFloating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const shouldFloat = container.scrollTop > scrollThreshold;
      setFloating(shouldFloat);
      if (!shouldFloat) setDropdownOpen(false);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollRef, scrollThreshold]);

  // close the dropdown if you click anywhere outside of it
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.animatedFilterNav-floating')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);

  const handleSelect = (index: number) => {
    onSelect(index);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav
        className={`projectMainNav animatedFilterNav-inline ${
          floating ? 'animatedFilterNav-inline-hidden' : ''
        }`}
      >
        {tabs.map((tab, index) => (
          <span
            key={index}
            onClick={() => handleSelect(index)}
            className={activeIndex === index ? 'active1' : 'navElement'}
          >
            {tab}
          </span>
        ))}
      </nav>

      <div
        className={`animatedFilterNav-floating ${
          floating ? 'animatedFilterNav-floating-visible' : ''
        }`}
      >
        <button
          type="button"
          className="animatedFilterNav-trigger"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-expanded={dropdownOpen}
        >
          <span className="animatedFilterNav-label">{tabs[activeIndex]}</span>
          <span
            className={`animatedFilterNav-arrow ${
              dropdownOpen ? 'animatedFilterNav-arrow-open' : ''
            }`}
          >
            ▾
          </span>
        </button>

        <div
          className={`animatedFilterNav-dropdown ${
            dropdownOpen ? 'animatedFilterNav-dropdown-open' : ''
          }`}
        >
          {tabs.map((tab, index) => (
            <span
              key={index}
              onClick={() => handleSelect(index)}
              className={`animatedFilterNav-item ${
                activeIndex === index ? 'animatedFilterNav-item-active' : ''
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default AnimatedFilterNav;
