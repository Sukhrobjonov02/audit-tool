import React from 'react';

const Stepper = ({ currentStep, steps }) => {
    return (
        <div className="w-full mb-8">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', position: 'relative' }}>
                {/* Progress Line */}
                <div style={{
                    position: 'absolute', top: '15px', left: '0', width: '100%', height: '2px',
                    background: 'var(--border)', zIndex: 0
                }}>
                    <div style={{
                        height: '100%',
                        background: 'var(--primary)',
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                        transition: 'width 0.4s ease',
                        boxShadow: '0 0 10px var(--primary-glow)'
                    }} />
                </div>

                {/* Dots */}
                {steps.map((step, index) => {
                    const isCompleted = currentStep > index + 1;
                    const isActive = currentStep === index + 1;

                    return (
                        <div key={index} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1,
                            width: '80px'
                        }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: isActive || isCompleted ? 'var(--primary)' : 'var(--bg-dark)',
                                border: `2px solid ${isActive || isCompleted ? 'var(--primary)' : 'var(--border)'}`,
                                color: 'white', fontWeight: 'bold', fontSize: '14px',
                                transition: 'all 0.3s',
                                boxShadow: isActive ? '0 0 15px var(--primary-glow)' : 'none'
                            }}>
                                {isCompleted ? '✓' : index + 1}
                            </div>
                            <span style={{
                                marginTop: '8px', fontSize: '12px', textAlign: 'center',
                                color: isActive ? 'white' : 'var(--text-muted)',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'color 0.3s'
                            }}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
