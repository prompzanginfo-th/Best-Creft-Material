---
name: odoo
description: Work with Best Craft Material Odoo 19 Sales on Railway—quotations, sales orders, customers, products, and handoffs. Use when the user mentions Odoo, โอดีโอ, sales, quotation, SO, invoice from sales, or the Railway Odoo URL.
---

# Odoo (BCM Sales)

## Instance

| Item | Value |
|------|--------|
| App | Best Craft Material (BCM) |
| Base URL | `https://odoo-production-5c14.up.railway.app` |
| Sales | `https://odoo-production-5c14.up.railway.app/odoo/sales` |
| Version | Odoo **19.0** (confirmed via `/web/webclient/version_info`) |
| Host | Railway |

Auth is required for Sales. Do not guess passwords. If blocked at login, ask the Owner for access (or a read-only session) before changing anything.

Cloud agents do **not** share the Owner’s Simple Browser cookie. A logged-in browser pane on the Owner’s machine ≠ API/session access for the agent.

## Users (from Owner screenshots)

OdooBot does not count. Human users seen:

| User | Login / email | Intended role |
|------|---------------|---------------|
| Administrator | `prompzang.info@gmail.com` | Owner / system admin |
| Chairat passuwan | `hengskill4@gmail.com` | Sales |
| kittmanee (Sale Project Manager) | `kittithaworawut@gmail.com` | Sales / project |
| บันชี (`testaccount`) | (accounting test user) | Accounting |

### Where to set rights (correct path)

1. **Settings → Users & Companies → Users**
2. Open each user → tab **Access Rights / สิทธิ์การเข้าใช้งาน**
3. Set app groups — do **not** bulk-edit Technical → Access Rights (`ir.model.access`)

### Verdict on current rights (needs Owner fix)

| User | Status | Main problems |
|------|--------|----------------|
| Chairat | เกือบโอเค | Sales = All Documents (เห็นของทุกคน); มี Purchase User; มี Invoicing |
| kittmanee | **สิทธิ์กว้างเกิน** | Purchase **Administrator** + Inventory **Administrator** + Bank check + Export Allow ทั้งที่บทบาทขาย |
| บันชี | บัญชีโอเคบางส่วน | Accounting Admin โอเค; แต่ Sales = All Documents; Contacts = No อาจกระทบออกบิล |

### Recommended groups (apply only after Owner approves)

| Field | Chairat (ขาย) | kittmanee (ขาย/โปรเจกต์) | บันชี (บัญชี) | Administrator |
|-------|---------------|---------------------------|---------------|---------------|
| บทบาท | ผู้ใช้ | ผู้ใช้ | ผู้ใช้ | **ผู้ดูแลระบบ** |
| การขาย | ผู้ใช้: เอกสารของตัวเอง *หรือ* เอกสารทั้งหมด (Owner เลือก) | เหมือน Chairat | **ไม่** หรือแค่อ่านผ่านงานบิล — อย่า All Documents ถ้าไม่จำเป็น | Administrator |
| การบัญชี | **ไม่** (หรือ Invoicing ถ้า Owner ให้เปิดบิลเอง) | **ไม่** | **ผู้ดูแลระบบ** | Accountant/Admin |
| ธนาคาร | ไม่ | **ไม่** | ตามที่บัญชีใช้จริง | ตาม Owner |
| สั่งซื้อ | **ไม่** | **ไม่** (ยกเว้น Owner ให้จัดซื้อ) | ไม่ หรือ User ถ้้าต้องเห็น PO | Administrator |
| สินค้าคงคลัง | ผู้ใช้ (ถ้าต้องดูสต็อก) | ผู้ใช้ — **ไม่ใช่** Administrator | View/User ตามงาน | Administrator |
| สินค้า | สร้าง | สร้าง | View | ตาม Admin |
| ติดต่อ | การสร้าง | การสร้าง | **อย่างน้อยอ่าน/สร้าง** (อย่า No ถ้าออกบิล) | ตาม Admin |
| ส่งออก | ไม่ | **ไม่** | ไม่ เว้น Owner อนุญาต | ตาม Admin |

## When this skill applies

- User opens or pastes the Railway Odoo URL / `/odoo/sales`
- Speech/dictation: โอดีโอ / โอดีโอโอ / โอดู → **Odoo**
- Sales work: quotation, SO, customer, pricelist, delivery from sales, invoice from order

## Hard rules (Owner policy)

Owner approves all financial changes. AI must not invent or silently alter numbers.

1. **ห้าม** แก้ตัวเลข ยอดเงิน สูตรบัญชี หรือข้อมูลทางการเงินเอง
2. แก้ได้เฉพาะเมื่อ Owner สั่งตรง / อนุมัติชัด / หรือแก้ตามหลักฐานที่ Owner ให้
3. ทุกครั้งที่เปลี่ยนตัวเลข: ระบุเหตุผล และบันทึกใน Change Log
4. **ห้าม** ลบข้อมูล / เปลี่ยนสูตร โดยไม่ได้รับการอนุมัติ
5. Exception: คำสั่งตรง เช่น "แก้ยอดนี้" "เปลี่ยนสูตรนี้" "ลบไฟล์นี้" = อนุมัติแล้ว — ทำได้ พร้อมบันทึกว่าใครสั่งและเปลี่ยนอะไร

Prefer **read / explain / propose** over write. On production, confirm before create/update/cancel/delete.

## Speech → meaning

| Dictation | Meaning |
|-----------|---------|
| โอดีโอ / โอดู | Odoo |
| ควอเทชัน / ใบเสนอ | Quotation |
| เอสโอ / ออเดอร์ขาย | Sales Order |
| ลูกค้า / พาร์ทเนอร์ | Customer / partner |
| เลขรัน | Document sequence number |
| แฮนออฟ / handoff | Handoff note for next agent |

Infer from context; state the assumed meaning briefly; continue without long clarification when clear.

## Sales workflow (Odoo 19)

Canonical path (do not skip states without Owner approval):

1. **Quotation** (`sale.order` draft) — lines, taxes, pricelist
2. **Send / confirm** → Sales Order
3. Delivery / invoicing only when Owner asks or process already requires it
4. Report status with document number (เลขรัน), customer, state, totals **as shown in Odoo** (do not recalculate differently)

### Safe read checklist

- [ ] Confirm environment (this Railway production URL)
- [ ] Open Sales; note filter/search used
- [ ] Record: document name, partner, state, amount untaxed/tax/total, currency
- [ ] Summarize in Thai unless Owner asks otherwise

### Before any write

- [ ] Restate intended change in one sentence
- [ ] Confirm no financial fields change unless Owner approved those exact values
- [ ] After change: Change Log entry

## Change Log format

```markdown
### YYYY-MM-DD HH:mm (Asia/Bangkok) — [doc/model]
- Ordered by: [Owner name or "Owner"]
- What changed: [field] [old → new] (only values Owner gave/approved)
- Why: [reason]
- Evidence: [message / screenshot / doc ref]
```

## Agent collaboration

- One job per turn: read status **or** propose change **or** apply approved change
- Leave a short handoff: URL, doc numbers, state, blockers, next step
- Do not fight other agents over the same SO; lock via handoff note in chat

## Out of scope unless Owner asks

- Database manager / drop DB / install unrequested apps
- Bulk price edits, mass cancel, or scripted imports of money fields
- Changing accounting formulas, tax mapping, or sequences without explicit order

## Handoff template

```markdown
## Odoo handoff — Sales
- URL: https://odoo-production-5c14.up.railway.app/odoo/sales
- Docs: [SOxxx / QTxxx]
- State: [draft/sent/sale/…]
- Done: …
- Blocked: …
- Next: …
- Financial edits pending approval: [none | list]
```
