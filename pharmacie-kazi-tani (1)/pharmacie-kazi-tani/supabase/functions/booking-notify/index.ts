// booking-notify Edge Function: validates reservation & formats owner alert
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { name, phone, date, time, guests, zone, notes, honeypot } = payload;

    // 1. Anti-bot honeypot check
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Bot detected' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Validate input essentials
    if (!name || !phone || !date || !time) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 422,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Generate instant WhatsApp booking URL
    const waText = encodeURIComponent(
      `🔔 Nouvelle Réservation La Terrasse Plus :\n` +
      `Nom: ${name}\n` +
      `Tél: ${phone}\n` +
      `Date: ${date} à ${time}\n` +
      `Couverts: ${guests}\n` +
      `Zone: ${zone}` +
      (notes ? `\nNote: ${notes}` : '')
    );
    const waUrl = `https://wa.me/213552666015?text=${waText}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Reservation recorded',
        whatsappDispatchUrl: waUrl,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
