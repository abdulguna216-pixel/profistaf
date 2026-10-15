import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './vendor/scrollcraft.js';
import './vendor/scrollcraft.css';
import './styles.css';

const links = [['services', 'Услуги'], ['advantages', 'Преимущества'], ['process', 'Как работаем'], ['faq', 'Вопросы'], ['contacts', 'Контакты']];
const services = [
  { name: 'Комплектация', image: 'pick-natural', text: 'Сборка заказов, комплектация, маркировка, упаковка.', alt: 'Комплектовщик собирает заказ у коробок' },
  { name: 'Производство', image: 'production-natural', text: 'Операторы линий, сборщики, подсобные рабочие.', alt: 'Рабочий за производственным столом' },
  { name: 'Логистика', image: 'logistics-natural', text: 'Погрузка, разгрузка, перемещение товаров, работа с ТСД.', alt: 'Погрузчик в складском проходе' },
  { name: 'Складской персонал', image: 'warehouse', text: 'Кладовщики, грузчики, разнорабочие, сотрудники смены.', alt: 'Сотрудник в проходе склада со спины' },
];
const steps = [
  ['Заявка', 'Оставляете запрос на сайте или по телефону'],
  ['Подбор', 'Формируем команду под ваши задачи'],
  ['Выход', 'Организуем выход сотрудников на объект'],
  ['Контроль', 'Сопровождаем и следим за качеством работы'],
  ['Результат', 'Вы получаете готовую команду'],
];
const advantages = [
  ['Быстрый выход персонала', 'Обсуждаем дату выхода под вашу задачу.', 'calendar'],
  ['Строгий отбор сотрудников', 'Согласуем требования к опыту и навыкам.', 'check'],
  ['Замена персонала', 'Порядок замены определяем в договоре.', 'replace'],
  ['Юридическая чистота', 'Условия оформления согласуем до начала работы.', 'shield'],
  ['Контроль качества', 'Определяем критерии и порядок контроля.', 'control'],
  ['Гибкие условия', 'Обсуждаем объём работ, график и формат.', 'settings'],
];
const questions = [
  ['Какие категории персонала вы предоставляете?', 'В заявке можно выбрать комплектацию, производство, логистику или складской персонал. Доступные специальности и требования к сотрудникам нужно уточнить у менеджера.'],
  ['Можно ли заказать сотрудников на одну смену?', 'Укажите желаемый график и объём работ. Возможность разовой смены, минимальный заказ и доступность сотрудников согласуются с менеджером.'],
  ['Как формируется стоимость услуг?', 'Для расчёта понадобятся тип работ, число сотрудников, график и требования к объекту. Итоговую стоимость и состав услуг согласуют в предложении.'],
  ['Кто контролирует работу сотрудников?', 'Ответственных, критерии качества и порядок взаимодействия на объекте необходимо согласовать до начала сотрудничества.'],
  ['Как организована замена персонала?', 'Основания, сроки и условия замены определяются договором. Уточните порядок замены при обсуждении вашей задачи.'],
];

function Arrow({ up = false }) { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={up ? 'M12 19V5m-6 6 6-6 6 6' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function Logo() { return <a className="logo" href="#hero" aria-label="ПРОФИ·СТАФФ — на главную"><strong>ПРОФИ<span>●</span>СТАФФ</strong><small>АУТСОРСИНГ ПЕРСОНАЛА</small></a>; }
function Heading({ lines, className = '', as: Tag = 'h2', dot = true }) { return <Tag className={`display ${className}`}>{lines.map((line, i) => <span className="display-line" key={line}>{line}{dot && i === lines.length - 1 && <span className="dot">.</span>}</span>)}</Tag>; }
function useCompact() {
  const [compact, setCompact] = useState(() => matchMedia('(max-width: 900px)').matches);
  useEffect(() => { const media = matchMedia('(max-width: 900px)'); const update = () => setCompact(media.matches); media.addEventListener('change', update); return () => media.removeEventListener('change', update); }, []);
  return compact;
}
function Photo({ name, alt, className = '', hero = false }) { return <img className={className} src={`/assets/${name}-960.webp`} srcSet={`/assets/${name}-480.webp 480w, /assets/${name}-960.webp 960w`} sizes={hero ? '(max-width: 900px) 100vw, 65vw' : '(max-width: 480px) 90vw, (max-width: 900px) 45vw, 25vw'} width={960} height={name.startsWith('warehouse') ? 1280 : 640} alt={alt} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : undefined} decoding="async" />; }

function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  const close = () => setOpen(false);
  useEffect(() => {
    const escape = e => { if (e.key === 'Escape' && open) { close(); button.current?.focus(); } };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return <header className="header container"><Logo /><nav className={open ? 'navigation is-open' : 'navigation'} id="main-navigation" aria-label="Основная навигация">{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}</nav><a className="button button-black header-cta" href="#request">Рассчитать стоимость <Arrow /></a><button ref={button} className="menu-toggle" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span /><span /></button></header>;
}
function Hero() { const compact = useCompact(); return <section className="hero container" id="hero"><div className="hero-art" aria-hidden="true"><Photo name="hero" hero alt="" /><div className="hero-index"><span>01</span><p>СКЛАДЫ<br />ПРОИЗВОДСТВА<br />ЛОГИСТИКА</p></div><a className="hero-sticker" href="#request" tabIndex={-1}>НАДЁЖНЫЙ<br />ПЕРСОНАЛ<br />ДЛЯ ВАШИХ<br />ЗАДАЧ<span className="circle orange"><Arrow /></span></a></div><div className="hero-copy"><p className="hero-eyebrow">НАДЁЖНЫЙ<br />ПАРТНЁР ДЛЯ ВАШЕГО<br />БИЗНЕСА</p><Heading as="h1" className="hero-title" lines={compact ? ['ПРОФЕССИОНАЛЬНЫЙ', 'ПЕРСОНАЛ ДЛЯ', 'СКЛАДОВ, ПРОИЗВОДСТВ', 'И ЛОГИСТИКИ'] : ['ПРОФЕССИОНАЛЬНЫЙ', 'ПЕРСОНАЛ ДЛЯ СКЛАДОВ,', 'ПРОИЗВОДСТВ И ЛОГИСТИКИ']} /><p className="hero-description">Берём на себя подбор, оформление, выход и контроль сотрудников. Вы фокусируетесь на бизнесе — мы обеспечиваем людей для ваших задач.</p><div className="hero-actions"><a className="button button-orange" href="#request">Рассчитать стоимость <Arrow /></a></div></div></section>; }

function Services({ selectService }) {
  return <section className="services container" id="services" data-sc-act="flow"><div className="services-heading"><div><p className="eyebrow">НАПРАВЛЕНИЯ РАБОТЫ</p><Heading lines={['НАШИ', 'УСЛУГИ']} dot={false} /></div><p className="services-intro">Подбираем и предоставляем персонал для ключевых направлений вашего бизнеса. Обсудим решение под вашу задачу, график и формат сотрудничества.</p></div><div className="service-grid">{services.map((service, i) => <article data-sc-in="" className="service-card" key={service.name}><div className="service-photo"><Photo name={service.image} alt={service.alt} /></div><div className="service-body"><span className="service-number">{String(i + 1).padStart(2, '0')}</span><div className="service-name-row"><h3>{service.name}</h3><button className="circle orange" onClick={() => selectService(service.name)} aria-label={`Отправьте заявку: ${service.name}`}><Arrow /></button></div><p>{service.text}</p></div></article>)}</div></section>;
}
function Process() {
  return <section className="process" id="process"><div className="container process-layout"><div><p className="eyebrow ink">ПРОСТОЙ ПРОЦЕСС</p><Heading lines={['КАК МЫ', 'РАБОТАЕМ']} /></div><ol className="process-steps">{steps.map(([name, text], i) => <li key={name} className="step"><span className="step-number">{String(i + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{text}</p></li>)}</ol></div></section>;
}
function Icon({ type }) { const paths = { calendar: 'M5 7h14v12H5z M8 4v6 M16 4v6 M5 11h14', check: 'M5 7h14v12H5z M8 4v5 M16 4v5 M8 14l3 3 5-5', replace: 'M5 9a7 7 0 0 1 12-3l3 3 M20 4v5h-5 M19 15a7 7 0 0 1-12 3l-3-3 M4 20v-5h5', shield: 'M12 3 5 6v6c0 4 7 8 7 8s7-4 7-8V6z M9 11l2 2 4-4', control: 'M4 8h16 M4 16h16 M8 5v6 M16 13v6', settings: 'M6 19v-3a6 6 0 0 1 12 0v3 M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8' }; return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="11" /><path d={paths[type]} /></svg>; }
function Advantages() { return <section className="advantages dark" id="advantages" data-sc-act="flow"><div className="container advantages-layout"><div><p className="eyebrow">ПОЧЕМУ ВЫБИРАЮТ НАС</p><Heading lines={['НАШИ', 'ПРЕИМУЩЕСТВА']} /></div><div className="advantages-grid">{advantages.map(([name, text, icon]) => <article className="advantage" data-sc-in="" key={name}><Icon type={icon} /><div><h3>{name}</h3><p>{text}</p></div></article>)}</div></div></section>; }
function FAQ() {
  const [opened, setOpened] = useState(null);
  return <section className="faq container" id="faq"><div className="faq-heading"><p className="eyebrow">ЧАСТЫЕ ВОПРОСЫ</p><Heading lines={['ВОПРОСЫ?', 'У НАС ЕСТЬ', 'ОТВЕТЫ']} /></div><div className="faq-art"><Photo name="faq-warehouse" alt="Светлый складской проход между высокими стеллажами с коробками" /></div><div className="faq-list">{questions.map(([question, answer], i) => <div className={`faq-item ${opened === i ? 'expanded' : ''}`} key={question}><h3><button id={`faq-button-${i}`} aria-expanded={opened === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpened(opened === i ? null : i)}><span>{question}</span><span className="faq-sign" aria-hidden="true">{opened === i ? '−' : '+'}</span></button></h3><div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-button-${i}`} hidden={opened !== i}><p>{answer}</p></div></div>)}</div></section>;
}

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT || '';
const privacyUrl = import.meta.env.VITE_PRIVACY_URL || '';
const liveMode = Boolean(endpoint && privacyUrl);
function LeadForm({ selected, setSelected }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [policyOpen, setPolicyOpen] = useState(false);
  const form = useRef(null);
  const pending = useRef(false);
  const dialog = useRef(null);
  useEffect(() => { if (policyOpen) dialog.current?.showModal(); else dialog.current?.close(); }, [policyOpen]);
  const submit = async event => {
    event.preventDefault(); if (pending.current) return;
    const values = new FormData(event.currentTarget);
    const name = String(values.get('name') || '').trim();
    const phone = String(values.get('phone') || '').trim();
    const digits = phone.replace(/\D/g, '');
    const next = {};
    if (name.length < 2 || !/\p{L}/u.test(name)) next.name = 'Укажите имя, минимум 2 символа.';
    if (digits.length < 10 || digits.length > 15 || !/^[+\d\s()−-]+$/.test(phone)) next.phone = 'Укажите телефон: от 10 до 15 цифр.';
    if (!services.some(s => s.name === selected)) next.task = 'Выберите тип задачи.';
    if (!values.get('consent')) next.consent = 'Отметьте согласие.';
    setErrors(next); setMessage('');
    if (Object.keys(next).length) { setStatus('invalid'); form.current.elements[Object.keys(next)[0]]?.focus(); return; }
    if (!liveMode) { setStatus('demo'); setMessage('Поля заполнены верно. Это демонстрационный режим: заявка не отправлена и данные не сохранены. Отправка будет доступна после подключения сервера и утверждённой политики.'); return; }
    pending.current = true; setStatus('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, task: selected, consent: true, website: values.get('website') }), signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('delivery');
      setStatus('success'); setMessage('Заявка отправлена. Спасибо за обращение!'); form.current.reset(); setSelected('');
    } catch { setStatus('error'); setMessage('Не удалось отправить заявку. Попробуйте ещё раз позже.'); }
    finally { pending.current = false; }
  };
  return <section className="request dark" id="request"><div className="request-decoration" aria-hidden="true" /><div className="container request-layout"><Heading className="request-heading" lines={['ОТПРАВЬТЕ ЗАЯВКУ', 'И МЫ ПОДГОТОВИМ ПРЕДЛОЖЕНИЕ', 'ПОД ВАШИ ЗАДАЧИ']} /><form ref={form} noValidate onSubmit={submit} className="lead-form"><div className="form-fields"><div className="field"><label className="sr-only" htmlFor="lead-name">Ваше имя</label><input id="lead-name" name="name" placeholder="Ваше имя*" autoComplete="given-name" required maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div><div className="field"><label className="sr-only" htmlFor="lead-phone">Номер телефона</label><input id="lead-phone" name="phone" type="tel" placeholder="Номер телефона*" autoComplete="tel" required maxLength={30} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}</div><div className="field full"><label className="sr-only" htmlFor="lead-task">Тип задачи</label><select id="lead-task" name="task" value={selected} onChange={e => setSelected(e.target.value)} required aria-invalid={Boolean(errors.task)} aria-describedby={errors.task ? 'task-error' : undefined}><option value="" disabled>Тип задачи*</option>{services.map(s => <option key={s.name}>{s.name}</option>)}</select>{errors.task && <span className="field-error" id="task-error">{errors.task}</span>}</div></div><div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div><button type="submit" className="button button-orange submit" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Отправьте заявку'}<Arrow /></button><div className="consent-row"><input id="consent" name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} /><label htmlFor="consent">{liveMode ? 'Согласен с ' : 'Ознакомлен с '}</label>{privacyUrl ? <a href={privacyUrl} target="_blank" rel="noopener noreferrer">политикой обработки данных</a> : <button type="button" className="text-button" onClick={() => setPolicyOpen(true)}>условиями демонстрационного режима</button>}</div>{errors.consent && <span className="field-error" id="consent-error">{errors.consent}</span>}<p className="demo-note">{liveMode ? '* Обязательные поля' : 'Демо: заявки не отправляются. Политика ожидает согласования.'}</p>{message && <p className={`form-message ${status}`} role="status" aria-live="polite">{message}</p>}</form><aside className="request-note"><svg className="asterisk" viewBox="0 0 32 32" aria-hidden="true" fill="none"><path d="M16 2v28M2 16h28M6 6l20 20M6 26 26 6" stroke="currentColor" strokeWidth="1.2" /></svg><p>БЫСТРО<br /> ПОДГОТОВИМ<br /> ПРЕДЛОЖЕНИЕ<br /> ПО ВАШЕЙ ЗАДАЧЕ</p></aside></div><dialog ref={dialog} onCancel={() => setPolicyOpen(false)} onClick={e => { if (e.target === dialog.current) setPolicyOpen(false); }} aria-labelledby="policy-title"><div className="dialog-inner"><h2 id="policy-title">Демонстрационный режим</h2><p>Сервер приёма заявок и утверждённая политика обработки персональных данных пока не подключены.</p><p>Данные проверяются только в вашем браузере, не отправляются и не сохраняются. Для проверки используйте тестовые данные. Это уведомление не является политикой обработки персональных данных.</p><button className="button button-black" onClick={() => setPolicyOpen(false)}>Понятно <Arrow /></button></div></dialog></section>;
}
function Footer() { return <footer className="footer container" id="contacts"><Logo /><nav aria-label="Навигация в подвале">{links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="contact-placeholder"><strong>Телефон компании</strong><small>Контакты будут добавлены</small></div><a className="circle outline to-top" href="#hero" aria-label="Вернуться наверх"><Arrow up /></a></footer>; }

function App() {
  const [selected, setSelected] = useState('');
  useEffect(() => { const engine = window.ScrollCraft.mount(document); return () => engine.destroy(); }, []);
  const selectService = value => { setSelected(value); document.getElementById('request')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); setTimeout(() => document.getElementById('lead-name')?.focus({ preventScroll: true }), 450); };
  return <><a className="skip-link" href="#services">Перейти к содержимому</a><Header /><main><Hero /><Services selectService={selectService} /><Process /><Advantages /><FAQ /><LeadForm selected={selected} setSelected={setSelected} /></main><Footer /></>;
}
createRoot(document.getElementById('root')).render(<App />);
