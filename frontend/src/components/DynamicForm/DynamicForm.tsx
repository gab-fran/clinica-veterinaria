import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useController, useForm, type Control, type DefaultValues, type FieldValues, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import styles from './DynamicForm.module.css';

export interface FieldConfig<T> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | string;
  options?: readonly { label: string; value: string }[];
  placeholder?: string;

  // Validação Nativa
  required?: boolean;

  // Limites de Caracteres e Valores
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | string;

  // Comportamentos e Eventos
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  searchable?: boolean;
  autoComplete?: string;
  pattern?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface DynamicFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  fields: FieldConfig<T>[];
  onSubmit: (data: T) => void;
  defaultValues?: Partial<T>;
  submitText?: string;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
  submitButtonClassName?: string;
  children?: React.ReactNode;
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className={styles.highlight}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function CustomSelectField<T extends FieldValues>({
  field,
  control,
  inputClassName,
}: {
  field: FieldConfig<T>;
  control: Control<T>;
  inputClassName: string;
}) {
  const { field: controllerField } = useController({ name: field.name, control });
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = field.options?.find(
    (option) => String(option.value) === String(controllerField.value ?? '')
  );

  const isSearchable = Boolean(field.searchable);

  const displayValue = isSearchable
    ? (isOpen ? searchTerm : (selectedOption?.label ?? ''))
    : (selectedOption?.label ?? '');

  const filteredOptions = useMemo(() => {
    if (!field.options) return [];
    if (!isSearchable || !searchTerm.trim()) return field.options;
    const query = searchTerm.toLowerCase();
    return field.options.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [field.options, isSearchable, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[focusedIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const handleSelectOption = (option: { label: string; value: string }) => {
    controllerField.onChange(option.value);
    setSearchTerm('');
    setIsOpen(false);
    setFocusedIndex(-1);

    if (field.onChange) {
      const syntheticEvent = {
        target: { name: String(field.name), value: option.value },
      } as React.ChangeEvent<HTMLSelectElement>;
      field.onChange(syntheticEvent);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    controllerField.onChange('');
    setSearchTerm('');
    setIsOpen(false);
    setFocusedIndex(-1);

    if (field.onChange) {
      const syntheticEvent = {
        target: { name: String(field.name), value: '' },
      } as React.ChangeEvent<HTMLSelectElement>;
      field.onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (field.disabled || field.readOnly) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setFocusedIndex(filteredOptions.length - 1);
      } else {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
      }
    } else if (e.key === 'Enter' || (e.key === ' ' && !isSearchable)) {
      if (isOpen && focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
        e.preventDefault();
        handleSelectOption(filteredOptions[focusedIndex]);
      } else if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className={styles.searchableContainer} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          id={String(field.name)}
          name={controllerField.name}
          ref={(e) => {
            controllerField.ref(e);
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
          }}
          type="text"
          value={displayValue}
          placeholder={field.placeholder || (isSearchable ? 'Selecione ou busque...' : 'Selecione uma opção...')}
          required={field.required && !controllerField.value}
          disabled={field.disabled}
          readOnly={!isSearchable || field.readOnly}
          className={`${inputClassName} ${styles.searchableInput} ${!isSearchable ? styles.nonSearchableInput : ''} ${isOpen ? styles.inputActive : ''}`}
          onClick={() => {
            if (!field.disabled && !field.readOnly) {
              setIsOpen((prev) => !prev);
              if (isSearchable) setSearchTerm('');
            }
          }}
          onFocus={() => {
            if (!field.disabled && !field.readOnly && isSearchable) {
              setIsOpen(true);
              setSearchTerm('');
            }
          }}
          onBlur={controllerField.onBlur}
          onChange={(e) => {
            if (isSearchable) {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              setFocusedIndex(0);
            }
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={`dropdown-${String(field.name)}`}
        />

        <div className={styles.inputActionIcons}>
          {controllerField.value && !field.disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              title="Limpar seleção"
              tabIndex={-1}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}

          <div
            className={`${styles.chevronIcon} ${isOpen ? styles.chevronRotated : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (!field.disabled && !field.readOnly) {
                setIsOpen((prev) => !prev);
                if (!isOpen && isSearchable) inputRef.current?.focus();
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {isOpen && !field.disabled && (
        <ul
          id={`dropdown-${String(field.name)}`}
          ref={listRef}
          className={styles.optionsDropdown}
          role="listbox"
        >
          {field.placeholder && !field.required && (
            <li
              role="option"
              aria-selected={!controllerField.value}
              className={`${styles.optionItem} ${!controllerField.value ? styles.optionSelected : ''}`}
              onClick={() => {
                controllerField.onChange('');
                setIsOpen(false);
                if (field.onChange) {
                  const syntheticEvent = {
                    target: { name: String(field.name), value: '' },
                  } as React.ChangeEvent<HTMLSelectElement>;
                  field.onChange(syntheticEvent);
                }
              }}
            >
              <span className={styles.optionLabelPlaceholder}>{field.placeholder}</span>
            </li>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = String(option.value) === String(controllerField.value ?? '');
              const isFocused = index === focusedIndex;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ''} ${isFocused ? styles.optionFocused : ''}`}
                  onClick={() => handleSelectOption(option)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <span className={styles.optionLabel}>
                    <HighlightText text={option.label} query={isSearchable ? searchTerm : ''} />
                  </span>
                  {isSelected && (
                    <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </li>
              );
            })
          ) : (
            <li className={styles.noOptions}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              Nenhum resultado encontrado
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitText = 'Salvar',
  className = styles.formContainer,
  fieldClassName = styles.fieldGroup,
  inputClassName = styles.inputField,
  submitButtonClassName = styles.submitButton,
  children,
}: DynamicFormProps<T>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {fields.map((field) => {
        // Extrai a função onChange nativa do React Hook Form
        const { onChange: rhfOnChange, ...registerProps } = register(field.name);

        if (field.hidden) {
          return (
            <input
              key={String(field.name)}
              type="hidden"
              {...register(field.name, { setValueAs: (value) => value === '' ? undefined : value })}
            />
          );
        }

        return (
          <div key={String(field.name)} className={fieldClassName}>
            <label htmlFor={String(field.name)} className={styles.fieldLabel}>
              {field.label} {field.required && <span className={styles.requiredAsterisk}>*</span>}
            </label>
            {field.options ? (
              <CustomSelectField field={field} control={control} inputClassName={inputClassName} />
            ) : (
              <input
                id={String(field.name)}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                min={field.min}
                max={field.max}
                step={field.step}
                disabled={field.disabled}
                readOnly={field.readOnly}
                autoComplete={field.autoComplete}
                pattern={field.pattern}
                className={inputClassName}
                {...registerProps}
                onChange={(e) => {
                  rhfOnChange(e);
                  field.onChange?.(e);
                }}
              />
            )}
            {errors[field.name] && (
              <span className={styles.errorMessage}>
                {errors[field.name]?.message as string}
              </span>
            )}
          </div>
        );
      })}

      {children}

      <button type="submit" disabled={isSubmitting} className={submitButtonClassName}>
        {isSubmitting ? 'Carregando...' : submitText}
      </button>
    </form>
  );
}

