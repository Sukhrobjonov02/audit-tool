import React, { useRef } from 'react';
import { calculateFunnel, calculateBudget, calculateHealthScore } from '../utils/calculations';
import { Download, AlertTriangle, TrendingUp, Users, Target, ShieldAlert, DollarSign, Activity } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const Dashboard = ({ formData, onReset }) => {
    const contentRef = useRef();

    const leads = calculateFunnel(formData.revenueGoal, formData.avgCheck, formData.conversionRate);
    const budget = calculateBudget(leads, formData.platform, formData.hasCRM, formData.hasSalesTeam);
    const score = calculateHealthScore(formData.hasCRM, formData.hasSalesTeam, formData.conversionRate);

    const handleDownload = () => {
        const element = contentRef.current;
        const opt = {
            margin: 10,
            filename: 'Biznes-Audit-Natijasi.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0f1115' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="text-gradient">Audit Natijalari</h2>
                <button className="btn-secondary" onClick={handleDownload} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    <Download size={18} /> PDF Yuklash
                </button>
            </div>

            <div ref={contentRef} style={{ padding: '0.5rem', borderRadius: '16px', background: 'var(--bg-dark)' }}>

                {/* Health Score Banner */}
                <div style={{
                    background: `linear-gradient(135deg, ${score < 50 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}, transparent)`,
                    border: `1px solid ${score < 50 ? 'var(--danger)' : 'var(--success)'}`,
                    borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem'
                }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', border: `4px solid ${score < 50 ? 'var(--danger)' : 'var(--success)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold',
                        color: score < 50 ? 'var(--danger)' : 'var(--success)', boxShadow: `0 0 20px ${score < 50 ? 'var(--danger-glow)' : 'rgba(16, 185, 129, 0.2)'}`
                    }}>
                        {score}/100
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'white' }}>Biznes Holati Indeksi</h3>
                        <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                            {score < 50 ? "Sizning tizimingizda jiddiy kamchiliklar bor. Byudjetingiz havoga ketmoqda." : "Yaxshi holat, lekin mukammallash uchun joy bor."}
                        </p>
                    </div>
                </div>

                {/* Core Calculation Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="glass-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            <TrendingUp size={20} className="text-success" />
                            <span>Oylik Daromad Maqsadi</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>${formData.revenueGoal.toLocaleString()}</div>
                        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                            Kerakli mijozlar: <span style={{ color: 'white', fontWeight: 'bold' }}>{Math.ceil(formData.revenueGoal / formData.avgCheck)} ta</span> (Chek: ${formData.avgCheck})
                        </div>
                    </div>

                    <div className="glass-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            <Users size={20} className="text-primary" />
                            <span>Kerakli Lidlar (Sorovlar)</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{leads} ta</div>
                        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                            Sotuv konversiyasi asosida ({formData.conversionRate}%)
                        </div>
                    </div>

                    <div className="glass-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            <Target size={20} className="text-accent" />
                            <span>Optimal Reklama Byudjeti</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>${budget.optimalBudget.toLocaleString()}</div>
                        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                            {formData.platform} da 1 ta lid narxi o'rtacha ${budget.baseCPL} (Benchmark)
                        </div>
                    </div>
                </div>

                {/* Losses & Warnings */}
                {budget.lossAmount > 0 && (
                    <div className="glass-card" style={{ borderColor: 'var(--danger)', background: 'rgba(239, 68, 68, 0.05)', marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
                            <AlertTriangle size={24} /> Havoga ketayotgan pullar (Samaradorlik jarimasi)
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Tizimsizlik sababli yo'qotish (oylik):</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--danger)' }}>+${budget.lossAmount.toLocaleString()} ({budget.penaltyPercentage}%)</span>
                            </div>
                            <div style={{ height: '1px', background: 'var(--danger)', opacity: 0.2 }} />

                            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                                {!formData.hasCRM && <li><span className="text-danger">CRM yo'qligi:</span> Mijozlar bazasi yo'qotilmoqda (+20% qimmatroq lid)</li>}
                                {!formData.hasSalesTeam && <li><span className="text-danger">Sotuv bo'limi yo'qligi:</span> O'zingiz sotayotganingiz uchun konversiya passiv qolib ketmoqda (+20%)</li>}
                                {formData.socialMediaStatus === "Yomon" && <li><span className="text-warning">Ijtimoiy tarmoq yomon:</span> Trust (ishonch) pastligi sababli lidlarning obunaga o'tish foizi past</li>}
                            </ul>

                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                * Agar sizda to'liq tizim (CRM + Jamoa) bo'lganida, byudjetingiz atigi <span style={{ color: 'white', fontWeight: 'bold' }}>${budget.cleanBudget.toLocaleString()}</span> bo'lar edi. Siz {budget.penaltyPercentage}% ortiqcha pul sarflayapsiz!
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Plan */}
                <h3 className="text-gradient" style={{ marginBottom: '1rem', marginTop: '2rem' }}>Ekspert Tavsiyalari</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {!formData.hasCRM && (
                        <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <ShieldAlert className="text-accent" style={{ flexShrink: 0 }} />
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>1. Zudlik bilan CRM o'rnating</h4>
                                <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                                    AmoCRM yoki Bitrix24 o'rnating. Bu har bir kelgan mijozni tarixini saqlaydi va eslatmalar orqali yo'qotishlarni atigi 1 oy ichida 20% ga kamaytiradi.
                                </p>
                            </div>
                        </div>
                    )}
                    {!formData.hasSalesTeam && (
                        <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <Activity className="text-secondary" style={{ flexShrink: 0 }} />
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>2. Alohida Sotuv Menejeri yollang</h4>
                                <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                                    Rahbar (Siz) o'rniga faqat sotuv ustida ishlaydigan xodim kerak. Skript (sotuv shabloni) yozing, agar xodim qidirish qiyin bo'lsa, avval outsource menejerlardan foydalaning.
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <DollarSign className="text-success" style={{ flexShrink: 0 }} />
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>3. Reklamani test byudjet bilan boshlang</h4>
                            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                                Birdaniga ${budget.optimalBudget.toLocaleString()} sarflamang. Oldin 15-20% ({Math.floor(budget.optimalBudget * 0.2)}$) summa bilan 1 haftalik test reklamasi qo'yib, real CPL narxini tasdiqlang.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button className="btn-secondary" onClick={onReset} style={{ padding: '0.75rem 2rem' }}>
                    Yangi Audit Boshlash
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
