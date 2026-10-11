import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface LoginFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      // Offline / demo mode login
      if (email === 'wahid@laterrasseplus.dz' && password === 'tlemcen2026') {
        onSuccess();
      } else {
        setError('Mode local : utilisez wahid@laterrasseplus.dz / tlemcen2026');
      }
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-surface p-4">
      <Container size="narrow">
        <Card className="max-w-md mx-auto p-8 bg-white border border-brand-border shadow-lg">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-md bg-brand-primary text-white font-display font-bold text-2xl mx-auto flex items-center justify-center mb-3">
              LT+
            </div>
            <h1 className="font-display text-2xl font-bold text-brand-text">Espace Propriétaire</h1>
            <p className="text-xs text-brand-text-muted mt-1">Connexion réservée à Wahid & l'équipe</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-sm bg-brand-accent/10 border border-brand-accent/20 text-xs text-brand-accent font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Adresse Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="wahid@laterrasseplus.dz"
              required
            />

            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>

            <Button type="button" variant="secondary" size="sm" onClick={onCancel} className="w-full">
              Retour au site
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
};
