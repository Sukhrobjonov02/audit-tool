import React from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

const FormStepOne = ({ formData, updateParent, onNext }) => {
    const handleSelect = (field, value) => updateParent(field, value);

    return (
        <div className="glass-card slide-up">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Biznesingiz haqida</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
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
                            {formData.hasCRM === true && <CheckCircle2 size={16} className="text-success" style={{ marginRight: '0.5rem' }} />}
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
                        <div className="card-content">
                            {formData.hasCRM === false && <XCircle size={16} className="text-danger" style={{ marginRight: '0.5rem' }} />}
                            <span>Yo'q</span>
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
                            {formData.hasSalesTeam === true && <CheckCircle2 size={16} className="text-success" style={{ marginRight: '0.5rem' }} />}
                            <span>Ha, albatta</span>
                        </div>
                    </label>
                    <label className="radio-card">
                        <input
                            type="radio"
                            name="sales_team"
                            checked={formData.hasSalesTeam === false}
                            onChange={() => handleSelect('hasSalesTeam', false)}
                        />
                        <div className="card-content">
                            {formData.hasSalesTeam === false && <XCircle size={16} className="text-danger" style={{ marginRight: '0.5rem' }} />}
                            <span>Yo'q, o'zim sotaman</span>
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
                    <option value="Zo'r">A'lo (Aktiv yuritiladi)</option>
                    <option value="O'rtacha">O'rtacha (Doimiylik yo'q)</option>
                    <option value="Yomon">Yomon (Juda sust yoki umuman yo'q)</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
                <button className="btn-primary" onClick={onNext} style={{ gap: '0.5rem' }}>
                    Keyingisi <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default FormStepOne;
