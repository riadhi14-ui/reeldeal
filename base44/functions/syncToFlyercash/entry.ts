import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { nom, code_unique } = await req.json();
    if (!nom || !code_unique) {
      return Response.json({ error: 'nom et code_unique sont requis' }, { status: 400 });
    }

    const url = Deno.env.get('FLYERCASH_RECEIVE_URL');
    const secret = Deno.env.get('REELDEAL_SYNC_SECRET');

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': secret,
      },
      body: JSON.stringify({ nom, code_unique }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // 404 / 400 côté Flyercash = le compte créateur n'existe pas encore
      const noAccount = res.status === 404 || res.status === 400;
      return Response.json({ error: 'Flyercash a refusé la requête', status: res.status, no_account: noAccount, details: data }, { status: 502 });
    }

    return Response.json({ success: true, flyercash: data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});