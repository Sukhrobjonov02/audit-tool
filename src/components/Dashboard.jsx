import React, { useRef } from 'react';
import { calculateFunnel, calculateBudget, calculateHealthScore } from '../utils/calculations';
import { Download, AlertTriangle, TrendingUp, Users, Target, ShieldAlert, DollarSign, Activity, Settings, RefreshCw } from 'lucide-react';
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
            filename: 'audit-result.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#050505' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Audit Natijasi</h2>
                <button className="btn-secondary" onClick={handleDownload} style={{ gap: '0.5rem' }}>
                    <Download size={18} /> Yuklab olish
                </button>
            </div>

            <div ref={contentRef} style={{ background: 'hsl(var(--background))', borderRadius: 'var(--radius)', color: 'hsl(var(--foreground))' }}>

                {/* Health Score Banner */}
                <div style={{
                    background: `linear-gradient(135deg, ${score < 50 ? 'hsl(var(--destructive) / 0.1)' : 'hsl(var(--success) / 0.1)'}, transparent)`,
                    border: `1px solid ${score < 50 ? 'hsl(var(--destructive) / 0.3)' : 'hsl(var(--success) / 0.3)'}`,
                    borderRadius: 'var(--radius)', padding: '2rem', marginBottom: '2.5rem',
                    display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-50%', left: '-10%', width: '150%', height: '200%',
                        background: `radial-gradient(circle at center, ${score < 50 ? 'hsl(var(--destructive) / 0.1)' : 'hsl(var(--success) / 0.1)'} 0%, transparent 60%)`,
                        zIndex: 0, pointerEvents: 'none'
                    }} />

                    <div style={{
                        width: '90px', height: '90px', borderRadius: '50%', background: 'hsl(var(--background))',
                        border: `4px solid ${score < 50 ? 'hsl(var(--destructive))' : 'hsl(var(--success))'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: '800',
                        color: score < 50 ? 'hsl(var(--destructive))' : 'hsl(var(--success))',
                        boxShadow: `0 0 30px ${score < 50 ? 'hsl(var(--destructive) / 0.2)' : 'hsl(var(--success) / 0.2)'}`,
                        zIndex: 1
                    }}>
                        {score}
                    </div>
                    <div style={{ zIndex: 1 }}>
                        <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'hsl(var(--foreground))' }}>Tizim Sog'lomligi</h3>
                        <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '1rem', lineHeight: '1.5' }}>
                            {score < 50 ? "Juda zaif holat. Byudjetning katta qismi jarimalar va yo'qotishlarga ketmoqda." : "Yaxshi holat, biroq tizimni masshtablashda qo'shimcha resurslar talab qilinadi."}
                        </p>
                    </div>
                </div>

                {/* Core Calculation Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', fontWeight: '500' }}>
                            <TrendingUp size={18} className="text-success" />
                            <span>Kutilayotgan Daromad</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'hsl(var(--foreground))', letterSpacing: '-0.05em' }}>
                            ${formData.revenueGoal.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: 'auto' }}>
                            Kerakli mijoz: <span style={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}>{Math.ceil(formData.revenueGoal / formData.avgCheck)} ta</span>
                        </div>
                    </div>

                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', fontWeight: '500' }}>
                            <Users size={18} style={{ color: 'hsl(var(--primary))' }} />
                            <span>Talab Qilingan Lidlar</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'hsl(var(--foreground))', letterSpacing: '-0.05em' }}>
                            {leads} <span style={{ fontSize: '1.25rem', fontWeight: '500', color: 'hsl(var(--muted-foreground))' }}>ta</span>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: 'auto' }}>
                            {formData.conversionRate}% sotuv konversiyasi asosida
                        </div>
                    </div>

                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', fontWeight: '500' }}>
                            <Target size={18} style={{ color: 'hsl(var(--warning))' }} />
                            <span>Marketing Byudjeti</span>
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'hsl(var(--foreground))', letterSpacing: '-0.05em' }}>
                            ${budget.optimalBudget.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: 'auto' }}>
                            1 ta lid narxi o'rtacha <span style={{ color: 'hsl(var(--foreground))', fontWeight: '600' }}>${budget.baseCPL}</span>
                        </div>
                    </div>
                </div>

                {/* Losses & Warnings */}
                {budget.lossAmount > 0 && (
                    <div className="glass-card" style={{ borderColor: 'hsl(var(--destructive) / 0.4)', background: 'hsl(var(--destructive) / 0.05)', marginBottom: '3rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--destructive))', fontSize: '1.25rem', fontWeight: '600' }}>
                            <AlertTriangle size={24} />
                            <span>Tizimdagi Teshiklar Oqibati</span>
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'hsl(var(--background))', borderRadius: 'calc(var(--radius) - 2px)', border: '1px solid hsl(var(--border))' }}>
                                <span style={{ color: 'hsl(var(--muted-foreground))', fontWeight: '500' }}>Bir oylik havoga uchayotgan pul:</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'hsl(var(--destructive))' }}>+${budget.lossAmount.toLocaleString()}</span>
                            </div>

                            <div style={{ background: 'hsl(var(--border) / 0.5)', height: '1px' }}></div>

                            <ul style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.95rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
                                {!formData.hasCRM && (
                                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(var(--destructive))' }}></div>
                                        <span><strong style={{ color: 'hsl(var(--foreground))' }}>CRM tizimidan foydalanmaslik:</strong> Lidlar yo'qoladi, 20% qimmatroq mijoz jalb qilasiz.</span>
                                    </li>
                                )}
                                {!formData.hasSalesTeam && (
                                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(var(--destructive))' }}></div>
                                        <span><strong style={{ color: 'hsl(var(--foreground))' }}>Sotuv bo'limi yo'qligi:</strong> Operatsion ishlar konversiyani 20% gacha pasaytiradi.</span>
                                    </li>
                                )}
                                {formData.socialMediaStatus === "Yomon" && (
                                    <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(var(--warning))' }}></div>
                                        <span><strong style={{ color: 'hsl(var(--foreground))' }}>Passiv Ijtimoiy Tarmoq:</strong> Mijoz ishonchi juda past. Lidlar sifatiga salbiy ta'sir ko'rsatadi.</span>
                                    </li>
                                )}
                            </ul>

                            <div style={{ padding: '1rem', background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'calc(var(--radius) - 2px)', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                                💡 Agar biznes to'liq avtomatlashtirilganda edi (CRM + Sotuv jamoasi), siz ayni natija uchun <strong style={{ color: 'hsl(var(--foreground))' }}>${budget.optimalBudget.toLocaleString()}</strong> emas, atigi <strong style={{ color: 'hsl(var(--success))' }}>${budget.cleanBudget.toLocaleString()}</strong> sarflagan bo'lar edingiz. Tizimsizlik tufayli reklama narxi <strong style={{ color: 'hsl(var(--destructive))' }}>{budget.penaltyPercentage}%</strong> ga qimmatladi.
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Plan */}
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>Amaliy Qadamlar</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {!formData.hasCRM && (
                        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '0.75rem', background: 'hsl(var(--primary) / 0.1)', borderRadius: 'calc(var(--radius) - 2px)' }}>
                                <Settings size={22} style={{ color: 'hsl(var(--primary))' }} />
                            </div>
                            <div>
                                <h4 style={{ color: 'hsl(var(--foreground))', marginBottom: '0.5rem', fontSize: '1rem' }}>CRM Tizimini O'rnating</h4>
                                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    AmoCRM yoki Bitrix24 o'rnating. Har bir murojaat e'tibor markazida bo'lishi xarajatni sezilarli darajada tushiradi.
                                </p>
                            </div>
                        </div>
                    )}
                    {!formData.hasSalesTeam && (
                        <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ padding: '0.75rem', background: 'hsl(var(--secondary) / 0.5)', borderRadius: 'calc(var(--radius) - 2px)' }}>
                                <Activity size={22} style={{ color: 'hsl(var(--foreground))' }} />
                            </div>
                            <div>
                                <h4 style={{ color: 'hsl(var(--foreground))', marginBottom: '0.5rem', fontSize: '1rem' }}>Alohida Sotuv Menejeri</h4>
                                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    Skript orqali ishlaydigan xodim yoki autsors yordamida sotuvni o'zingizdan uzoqlashtiring.
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{ padding: '0.75rem', background: 'hsl(var(--success) / 0.1)', borderRadius: 'calc(var(--radius) - 2px)' }}>
                            <DollarSign size={22} style={{ color: 'hsl(var(--success))' }} />
                        </div>
                        <div>
                            <h4 style={{ color: 'hsl(var(--foreground))', marginBottom: '0.5rem', fontSize: '1rem' }}>Test Reklama Boshlash</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Optimal byudjetning 20% (<span style={{ color: 'hsl(var(--foreground))', fontWeight: '500' }}>${Math.floor(budget.optimalBudget * 0.2)}</span>) miqdorida test jarayonini boshlab, konversiyangizni tasdiqlab oling.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                <button className="btn-secondary" onClick={onReset} style={{ gap: '0.5rem', padding: '0 2rem' }}>
                    <RefreshCw size={16} /> Qaytadan Hisoblash
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
