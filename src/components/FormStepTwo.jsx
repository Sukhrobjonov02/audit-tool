import React from 'react';

const FormStepTwo = ({ formData, updateParent, onNext, onPrev }) => {
    const handleChange = (e) => {
        updateParent(e.target.name, Number(e.target.value) || 0);
    };

    return (
        <div className="glass-card slide-up">
            <h2 className="text-gradient">Moliyaviy Maqsadlar</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', marginTop: '0.5rem' }}>
                Reklama byudjeti va voronkani hisoblash uchun mo'ljallangan daromadni kiriting.
            </p>

            <div className="input-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Oylik Daromad Maqsadingiz ($)</span>
                    <span className="text-gradient-primary" style={{ fontWeight: 'bold' }}>
                        ${formData.revenueGoal.toLocaleString()}
                    </span>
                </label>
                <input
                    type="number"
                    className="glass-input"
                    name="revenueGoal"
                    value={formData.revenueGoal}
                    onChange={handleChange}
                    style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '1px' }}
                />
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>O'rtacha chekingiz ($)</label>
                    <input
                        type="number"
                        className="glass-input"
                        name="avgCheck"
                        value={formData.avgCheck}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                    <label>Sotuv konversiyasi (%)</label>
                    <input
                        type="number"
                        className="glass-input"
                        name="conversionRate"
                        min="1" max="100"
                        value={formData.conversionRate}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="input-group" style={{ marginTop: '1rem' }}>
                <label>Asosiy reklama platformangiz?</label>
                <select
                    className="glass-input"
                    value={formData.platform}
                    onChange={(e) => updateParent('platform', e.target.value)}
                >
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook / Meta</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Google">Google Ads</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                <button className="btn-secondary" onClick={onPrev}>
                    ← Orqaga
                </button>
                <button className="btn-primary" onClick={onNext} style={{ background: 'linear-gradient(135deg, var(--success), var(--secondary))' }}>
                    Tahlil Qilish ✨
                </button>
            </div>
        </div>
    );
};

export default FormStepTwo;
