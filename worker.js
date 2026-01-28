const tgToken = "8305670772:AAHNFUE3gGoN13YXBW41jtQBMc_Exbtg4T8"
const CHAT_ID = 940450451



export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    if (url.pathname === '/send-order' && request.method === 'POST') {
      return handleSendOrder(request, env);
    }

    return new Response(JSON.stringify({ ok: false, error: 'Not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
};

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
    },
  });
}

async function handleSendOrder(request, env) {
  try {
    const body = await request.json();

    const { name, phone, items, subtotal, deliveryFee, total, orderId } = body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return badRequest('Invalid name');
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return badRequest('Invalid phone');
    }
    if (!Array.isArray(items) || items.length === 0) {
      return badRequest('Items required');
    }

    const safeSubtotal = Number(subtotal) || 0;
    const safeDelivery = Number(deliveryFee) || 0;
    const safeTotal = Number(total) || 0;

    if (!tgToken || !CHAT_ID) {
      return serverError('Telegram configuration missing');
    }

    const text = buildTelegramMessage({
      orderId,
      name,
      phone,
      items,
      subtotal: safeSubtotal,
      deliveryFee: safeDelivery,
      total: safeTotal,
      deliveryType: body.deliveryType,
      address: body.address,
      payment: body.payment,
      comment: body.comment,
      createdAt: body.createdAt,
    });

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${tgToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      },
    );

    const tgJson = await tgResponse.json().catch(() => ({}));

    if (!tgResponse.ok || !tgJson.ok) {
      return serverError(
        tgJson.description || 'Telegram API error'
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (err) {
    return serverError(err && err.message ? err.message : 'Unexpected error');
  }
}

function buildTelegramMessage(order) {
  const {
    orderId,
    name,
    phone,
    items,
    subtotal,
    deliveryFee,
    total,
    deliveryType,
    address,
    payment,
    comment,
    createdAt,
  } = order;

  const lines = [];
  lines.push(`*Заказ SweetLife*`);
  if (orderId) {
    lines.push(`*Номер заказа:* \`${escapeMd(orderId)}\``);
  }
  if (createdAt) {
    const dt = new Date(createdAt);
    lines.push(`*Дата/время:* ${escapeMd(dt.toLocaleString('ru-RU'))}`);
  }
  lines.push('');
  lines.push(`*Имя:* ${escapeMd(name)}`);
  lines.push(`*Телефон:* ${escapeMd(phone)}`);

  if (deliveryType === 'delivery') {
    lines.push(`*Доставка:* доставка`);
    lines.push(`*Адрес:* ${escapeMd(address || '—')}`);
  } else {
    lines.push(`*Доставка:* самовывоз`);
  }

  lines.push(`*Оплата:* ${payment === 'card' ? 'карта' : 'наличные'}`);

  if (comment) {
    lines.push(`*Комментарий:* ${escapeMd(comment)}`);
  }

  lines.push('');
  lines.push('*Товары:*');

  items.forEach((item, index) => {
    const title = escapeMd(item.title || '');
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    const lineTotal = qty * price;
    lines.push(
      `${index + 1}) ${title} — ${qty} x ${Math.round(price)} сом = ${Math.round(lineTotal)} сом`
    );
  });

  lines.push('');
  lines.push(`*Товары:* ${Math.round(subtotal)} сом`);
  lines.push(
    `*Доставка:* ${
      deliveryFee > 0 ? `${Math.round(deliveryFee)} сом` : 'Бесплатно'
    }`
  );
  lines.push(`*Итого:* ${Math.round(total)} сом`);

  return lines.join('\n');
}

function escapeMd(text) {
  return String(text).replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

function badRequest(message) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

function serverError(message) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}


