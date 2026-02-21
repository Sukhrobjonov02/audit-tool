import React from 'react';
import { Check } from 'lucide-react';

const Stepper = ({ currentStep, steps }) => {
    return (
        <div className="w-full" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                {/* Progress Line Background */}
                <div style={{
                    position: 'absolute', top: '16px', left: '10%', right: '10%', height: '2px',
                    background: 'hsl(var(--border))', zIndex: 0
                }}>
                    {/* Progress Fill */}
                    <div style={{
                        height: '100%',
                        background: 'hsl(var(--primary))',
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                </div>

                {/* Dots */}
                {steps.map((step, index) => {
                    const isCompleted = currentStep > index + 1;
                    const isActive = currentStep === index + 1;
                    const isUpcoming = currentStep < index + 1;

                    return (
                        <div key={index} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1,
                            width: '80px', gap: '0.75rem'
                        }}>
                            <div style={{
                                width: '34px', height: '34px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: (isActive || isCompleted) ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                                border: `1px solid ${(isActive || isCompleted) ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                                color: (isActive || isCompleted) ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                                fontWeight: '600', fontSize: '0.875rem',
                                transition: 'all 0.3s ease',
                                boxShadow: isActive ? '0 0 0 4px hsl(var(--primary) / 0.2)' : 'none',
                                transform: isActive ? 'scale(1.1)' : 'scale(1)'
                            }}>
                                {isCompleted ? <Check size={16} strokeWidth={3} /> : index + 1}
                            </div>
                            <span style={{
                                fontSize: '0.875rem', textAlign: 'center',
                                color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'color 0.3s ease'
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
