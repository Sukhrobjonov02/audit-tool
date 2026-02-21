import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

const FormStepTwo = ({ formData, updateParent, onNext, onPrev }) => {
    const handleChange = (e) => {
        updateParent(e.target.name, Number(e.target.value) || 0);
    };

    return (
        <div className="glass-card slide-up">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Moliyaviy Maqsadlar</h2>
            <p className="text-muted" style={{ marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                Reklama byudjeti va voronkani hisoblash uchun mo'ljallangan daromadni kiriting.
            </p>

            <div className="input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Oylik Daromad Maqsadingiz ($)</span>
                    <span style={{ fontWeight: '600', color: 'hsl(var(--foreground))', fontSize: '1.25rem' }}>
                        ${formData.revenueGoal.toLocaleString()}
                    </span>
                </label>
                <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }}>$</span>
                    <input
                        type="number"
                        className="glass-input"
                        name="revenueGoal"
                        value={formData.revenueGoal}
                        onChange={handleChange}
                        style={{ paddingLeft: '2rem', fontSize: '1rem', fontWeight: '500' }}
                    />
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <input
                        type="range"
                        name="revenueGoal"
                        min="1000"
                        max="100000"
                        step="500"
                        value={formData.revenueGoal}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="input-group">
                    <label>O'rtacha chekingiz ($)</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }}>$</span>
                        <input
                            type="number"
                            className="glass-input"
                            name="avgCheck"
                            value={formData.avgCheck}
                            onChange={handleChange}
                            style={{ paddingLeft: '2rem' }}
                        />
                    </div>
                </div>
                <div className="input-group">
                    <label>Konversiya (%)</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="number"
                            className="glass-input"
                            name="conversionRate"
                            min="1" max="100"
                            value={formData.conversionRate}
                            onChange={handleChange}
                        />
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }}>%</span>
                    </div>
                </div>
            </div>

            <div className="input-group" style={{ marginTop: '0.5rem' }}>
                <label>Asosiy reklama platformangiz?</label>
                <select
                    className="glass-input"
                    value={formData.platform}
                    onChange={(e) => updateParent('platform', e.target.value)}
                >
                    <option value="Instagram">Instagram (Ommaviy)</option>
                    <option value="Facebook">Facebook (B2B/Yoshi kattalar)</option>
                    <option value="TikTok">TikTok (Yoshlar segmenti)</option>
                    <option value="Google">Google Ads (Issiq trafik)</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                <button className="btn-secondary" onClick={onPrev} style={{ gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> Orqaga
                </button>
                <button className="btn-primary" onClick={onNext} style={{ gap: '0.5rem', background: 'hsl(var(--foreground))', color: 'hsl(var(--background))' }}>
                    Tahlil Qilish <Sparkles size={18} />
                </button>
            </div>
        </div>
    );
};

export default FormStepTwo;
