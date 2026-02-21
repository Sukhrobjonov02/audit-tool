import React from 'react';

const FormStepOne = ({ formData, updateParent, onNext }) => {
    const handleSelect = (field, value) => updateParent(field, value);

    return (
        <div className="glass-card fade-in">
            <h2 className="text-gradient">Biznesingiz haqida</h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                Tahlilni aniqroq qilish uchun quyidagi savollarga javob bering.
            </p>

            <div className="input-group">
                <label>Siz qaysi sohada faoliyat yuritasiz?</label>
                <select
                    className="glass-input"
                    value={formData.businessType}
                    onChange={(e) => handleSelect('businessType', e.target.value)}
                >
                    <option value="Xizmat ko'rsatish">Xizmat ko'rsatish (Servis)</option>
                    <option value="Chakana savdo">Chakana savdo (Retail/E-commerce)</option>
                    <option value="Ishlab chiqarish">Ishlab chiqarish</option>
                    <option value="B2B">B2B konsalting va xizmatlar</option>
                </select>
            </div>

            <div className="input-group">
                <label>Sizda CRM tizimi (AmoCRM, Bitrix24 va h.k) mavjudmi?</label>
                <div className="radio-card-grid">
                    <label className="radio-card">
                        <input
                            type="radio"
                            name="crm"
                            checked={formData.hasCRM === true}
                            onChange={() => handleSelect('hasCRM', true)}
                        />
                        <div className="card-content">
                            <span>Ha, bor</span>
                        </div>
                    </label>
                    <label className="radio-card">
                        <input
                            type="radio"
                            name="crm"
                            checked={formData.hasCRM === false}
                            onChange={() => handleSelect('hasCRM', false)}
                        />
                        <div className="card-content" style={{ borderColor: formData.hasCRM === false ? 'var(--danger)' : '' }}>
                            <span className={formData.hasCRM === false ? 'text-danger' : ''}>Yo'q</span>
                        </div>
                    </label>
                </div>
            </div>

            <div className="input-group">
                <label>Alohida sotuv bo'limi (menejerlar) bormi?</label>
                <div className="radio-card-grid">
                    <label className="radio-card">
                        <input
                            type="radio"
                            name="sales_team"
                            checked={formData.hasSalesTeam === true}
                            onChange={() => handleSelect('hasSalesTeam', true)}
                        />
                        <div className="card-content">
                            <span>Ha</span>
                        </div>
                    </label>
                    <label className="radio-card">
                        <input
                            type="radio"
                            name="sales_team"
                            checked={formData.hasSalesTeam === false}
                            onChange={() => handleSelect('hasSalesTeam', false)}
                        />
                        <div className="card-content" style={{ borderColor: formData.hasSalesTeam === false ? 'var(--danger)' : '' }}>
                            <span className={formData.hasSalesTeam === false ? 'text-danger' : ''}>Yo'q, o'zim</span>
                        </div>
                    </label>
                </div>
            </div>

            <div className="input-group">
                <label>Ijtimoiy tarmoqlaringiz holati qanday?</label>
                <select
                    className="glass-input"
                    value={formData.socialMediaStatus}
                    onChange={(e) => handleSelect('socialMediaStatus', e.target.value)}
                >
                    <option value="Zo'r">Zo'r (Aktiv yuritiladi)</option>
                    <option value="O'rtacha">O'rtacha</option>
                    <option value="Yomon">Yomon / Umuman yo'q</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button className="btn-primary" onClick={onNext}>
                    Keyingisi →
                </button>
            </div>
        </div>
    );
};

export default FormStepOne;
