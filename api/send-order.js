export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { TG_BOT_TOKEN, TG_CHAT_ID } = process.env;

    if (!TG_BOT_TOKEN || !TG_BOT_ID) {
      return res
        .status(500)
        .json({ ok: false, error: 'Server configuration error: missing TG_BOT_TOKEN or TG_BOT_ID' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const order = body.order || body;

    if (!order || typeof order !== 'object') {
      return res.status(400).json({ ok: false, error: 'Missing or invalid order payload' });
    }

    const {
      id,
      name,
      phone,
      deliveryType,
      address,
      items,
      subtotal,
      deliveryFee,
      total,
      comment,
      createdAt,
      payment,
    } = order;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ ok: false, error: 'Имя обязательно' });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ ok: false, error: 'Телефон обязателен' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, error: 'Список товаров пуст' });
    }

    const safeSubtotal = Number(subtotal) || 0;
    const safeDelivery = Number(deliveryFee) || 0;
    const safeTotal = Number(total) || 0;

    const escapeHtml = (str = '') =>
      String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const lines = [];
    lines.push('<b>Заказ SweetLife</b>');
    if (id) {
      lines.push(`<b>Номер заказа:</b> ${escapeHtml(id)}`);
    }
    if (created != null) {
      const dt = new Date(createdAt);
      if (!Number.isNaN(dt.getTime())) {
        lines.push(`<b>Дата/время:</b> ${escapeHtml(dt.toLocaleString('ru-RU'))}`);
      }
    }
    lines.push(`<b>Имя:</b> ${escapeHtml(name)}`);
    lines.push(`<b>Телефон:</b> ${escapeHtml(phone)}`);
    if (deliveryType === 'delivery') {
      lines.push('<b>Доставка:</b> доставка');
      lines.push(`<b>Адрес:</b> ${escapeHtml(address || '')}`);
    } else {
      lines.push('<b>Доставка:</b> самовывоз');
    }
    if (payment) {
      const paymentLabel = payment === 'card' ? 'карта' : 'наличные';
      lines.push(`<b>Оплата:</b> ${escapeHtml(paymentLabel)}`);
    }
    if (comment) {
      lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);
    }

    lines.push('');
    lines.push('<b>Товары:</b>');

    items.forEach((item, index) => {
      const title = escapeHtml(item.title || '');
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      const lineTotal = qty * price;
      lines.push(
        `${index + 1}) ${title} — ${qty} x ${Math.round(price)} сом = ${Math.round(
          lineTotal
        )} сом`
      );
    });

    lines.push('');
    lines.push(`<b>Товары:</b> ${Math.round(safeSubtotal)} сом`);
    lines.push(
      `<b>Доставка:</b> ${
        safeDelivery > 0 ? `${Math.round(safeDelivery)} сом` : 'Бесплатно'
      }`
    );
    lines.push(`<b>Итого:</b> ${Math.round(safeTotal)} сом`);

    const text = lines.join('\n');

    const resp = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_BOT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await resp.json().catch(() => null);

    if (!resp.ok || !data || data.ok !== true) {
      const errorMessage =
        (data && data.description) || `Telegram API error: ${resp.status || 'unknown error'}`;
      return res.status(502).json({ ok: false, error: errorMessage });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-order error:', err);
    return res
      .status(500)
      .json({ ok: false, error: 'Ошибка при отправке заказа. Попробуйте позже.' });
  }
}


