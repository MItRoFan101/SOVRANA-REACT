-- data.sql
INSERT INTO categories (name, slug, sort_order, description, active) VALUES
('Популярное', 'popular', 1, 'Самые популярные блюда', true),
('Бургеры', 'burgers', 2, 'Классические и острые бургеры', true),
('Лонгбургеры', 'longburgers', 3, 'Бургеры в длинной булке', true),
('Закуски', 'snacks', 4, 'Картофель фри и другие закуски', true),
('Соусы', 'sauces', 5, 'Дополнительные соусы', true),
('Горячее', 'hot', 6, 'Мясо на углях и другие горячие блюда', true),
('Супы', 'soups', 7, 'Ароматные супы', true),
('Горячие напитки', 'hot-drinks', 8, 'Кофе, чай и какао', true),
('Холодные напитки', 'cold-drinks', 9, 'Газированные напитки и соки', true)
ON CONFLICT (slug) DO NOTHING;

-- Продукты
INSERT INTO products (name, description, price, category, available, can_be_spicy, can_be_long, can_have_extra_patty, sold_by_weight, price_per100g, weight_step) VALUES
('Классический бургер', 'Сочная говяжья котлета, свежие овощи и фирменный соус', 299.00, 'burgers', true, true, true, true, false, null, null),
('Чизбургер', 'Говяжья котлета с расплавленным сыром чеддер', 349.00, 'burgers', true, true, true, true, false, null, null),
('Картофель фри', 'Хрустящий картофель с солью и травами', 149.00, 'snacks', true, false, false, false, false, null, null),
('Бекон бургер', 'С беконом и специальным соусом', 399.00, 'burgers', true, true, true, true, false, null, null),
('Мясо на углях', 'Свинина, запеченная на углях', 299.00, 'hot', true, false, false, false, true, 299.00, 100),
('Наггетсы', 'Куриные наггетсы с хрустящей корочкой', 199.00, 'snacks', true, false, false, false, false, null, null)
ON CONFLICT (name) DO NOTHING;

-- Топпинги для бургеров
INSERT INTO product_toppings (product_id, topping)
SELECT id, 'Бекон' FROM products WHERE category IN ('burgers', 'longburgers')
ON CONFLICT DO NOTHING;

INSERT INTO product_toppings (product_id, topping)
SELECT id, 'Морковь по-корейски' FROM products WHERE category IN ('burgers', 'longburgers')
ON CONFLICT DO NOTHING;

INSERT INTO product_toppings (product_id, topping)
SELECT id, 'Сыр Чеддер' FROM products WHERE category IN ('burgers', 'longburgers')
ON CONFLICT DO NOTHING;

INSERT INTO product_toppings (product_id, topping)
SELECT id, 'Маринованные огурцы' FROM products WHERE category IN ('burgers', 'longburgers')
ON CONFLICT DO NOTHING;

-- Соусы
INSERT INTO product_sauces (product_id, sauce)
SELECT id, 'Барбекю' FROM products WHERE category IN ('burgers', 'longburgers', 'snacks', 'hot')
ON CONFLICT DO NOTHING;

INSERT INTO product_sauces (product_id, sauce)
SELECT id, 'Кисло-сладкий' FROM products WHERE category IN ('burgers', 'longburgers', 'snacks', 'hot')
ON CONFLICT DO NOTHING;

INSERT INTO product_sauces (product_id, sauce)
SELECT id, 'Чесночный' FROM products WHERE category IN ('burgers', 'longburgers', 'snacks', 'hot')
ON CONFLICT DO NOTHING;

INSERT INTO product_sauces (product_id, sauce)
SELECT id, 'Сырный' FROM products WHERE category IN ('burgers', 'longburgers', 'snacks', 'hot')
ON CONFLICT DO NOTHING;