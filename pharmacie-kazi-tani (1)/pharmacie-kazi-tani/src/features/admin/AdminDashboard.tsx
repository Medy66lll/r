import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  getOfferings,
  getReservations,
  getOwnerTasks,
  updateOfferingAvailability,
  toggleTaskCompletion,
} from '@/lib/supabase/queries';
import type { Database } from '@/types/database';

type Offering = Database['public']['Tables']['offerings']['Row'];
type Reservation = Database['public']['Tables']['reservations']['Row'];
type OwnerTask = Database['public']['Tables']['owner_tasks']['Row'];

interface AdminDashboardProps {
  onLogout: () => void;
  onViewSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onViewSite }) => {
  const [activeTab, setActiveTab] = useState<'offerings' | 'reservations' | 'tasks'>('offerings');
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [tasks, setTasks] = useState<OwnerTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [off, res, tsk] = await Promise.all([
        getOfferings(),
        getReservations(),
        getOwnerTasks(),
      ]);
      setOfferings(off);
      setReservations(res);
      setTasks(tsk);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleToggleOffering = async (id: string, current: boolean) => {
    setOfferings((prev) => prev.map((o) => (o.id === id ? { ...o, is_available: !current } : o)));
    await updateOfferingAvailability(id, !current);
  };

  const handleToggleTask = async (id: string, current: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, is_completed: !current } : t)));
    await toggleTaskCompletion(id, !current);
  };

  return (
    <div className="min-h-screen bg-brand-surface py-8">
      <Container>
        {/* Admin Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-border mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary-dark">Gestion Propriétaire</span>
            <h1 className="font-display text-3xl font-bold text-brand-text">La Terrasse Plus — Tlemcen</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={onViewSite}>Voir le site public</Button>
            <Button variant="accent" size="sm" onClick={onLogout}>Déconnexion</Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('offerings')}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
              activeTab === 'offerings' ? 'bg-brand-primary text-white' : 'bg-white text-brand-text-muted border border-brand-border'
            }`}
          >
            Plats & Carte ({offerings.length})
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
              activeTab === 'reservations' ? 'bg-brand-primary text-white' : 'bg-white text-brand-text-muted border border-brand-border'
            }`}
          >
            Réservations ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
              activeTab === 'tasks' ? 'bg-brand-primary text-white' : 'bg-white text-brand-text-muted border border-brand-border'
            }`}
          >
            Checklist Propriétaire ({tasks.length})
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-brand-text-muted font-medium">Chargement des données...</div>
        ) : (
          <div>
            {activeTab === 'offerings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offerings.map((item) => (
                  <Card key={item.id} className="p-4 bg-white flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-sm text-brand-text">{item.name}</span>
                        <span className="text-xs font-extrabold text-brand-primary-dark">{item.price_display}</span>
                      </div>
                      <span className="text-xs text-brand-text-muted capitalize">{item.category}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-brand-border-subtle">
                      <Badge variant={item.is_available ? 'success' : 'muted'}>
                        {item.is_available ? 'Disponible' : 'Épuisé'}
                      </Badge>
                      <button
                        onClick={() => handleToggleOffering(item.id, item.is_available)}
                        className="text-xs font-bold text-brand-primary-dark hover:underline"
                      >
                        {item.is_available ? 'Désactiver' : 'Activer'}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="bg-white rounded-lg border border-brand-border overflow-hidden">
                {reservations.length === 0 ? (
                  <div className="p-8 text-center text-xs text-brand-text-muted">Aucune réservation pour le moment.</div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-surface-muted border-b border-brand-border font-bold">
                      <tr>
                        <th className="p-3">Nom</th>
                        <th className="p-3">Téléphone</th>
                        <th className="p-3">Date & Heure</th>
                        <th className="p-3">Couverts</th>
                        <th className="p-3">Zone</th>
                        <th className="p-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} className="border-b border-brand-border-subtle">
                          <td className="p-3 font-semibold">{r.name}</td>
                          <td className="p-3">{r.phone}</td>
                          <td className="p-3">{r.reservation_date} à {r.reservation_time}</td>
                          <td className="p-3">{r.party_size}</td>
                          <td className="p-3">{r.seating_preference}</td>
                          <td className="p-3">
                            <Badge variant="primary">{r.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="flex flex-col gap-3">
                {tasks.map((t) => (
                  <Card key={t.id} className="p-4 bg-white flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={t.is_completed}
                        onChange={() => handleToggleTask(t.id, t.is_completed)}
                        className="w-4 h-4 rounded text-brand-primary"
                      />
                      <span className={`text-sm ${t.is_completed ? 'line-through text-brand-text-muted' : 'font-semibold text-brand-text'}`}>
                        {t.task_description}
                      </span>
                    </div>
                    <Badge variant={t.is_completed ? 'success' : 'accent'}>
                      {t.is_completed ? 'Validé' : 'À faire'}
                    </Badge>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};
