export const productsData = {
    popular: [
        { id: 'classic-burger', name: 'Классический бургер', description: 'Сочная говяжья котлета, свежие овощи и фирменный соус', price: 299, category: 'burgers' },
        { id: 'cheeseburger', name: 'Чизбургер', description: 'Говяжья котлета с расплавленным сыром чеддер', price: 349, category: 'burgers' },
        { id: 'fries', name: 'Картофель фри', description: 'Хрустящий картофель с солью и травами', price: 149, category: 'snacks' },
        { id: 'bacon-burger', name: 'Бекон бургер', description: 'С беконом и специальным соусом', price: 399, category: 'burgers' },
        { id: 'grilled-meat', name: 'Мясо на углях', description: 'Свинина, запеченная на углях', price: 299, category: 'hot' },
        { id: 'nuggets', name: 'Наггетсы', description: 'Куриные наггетсы с хрустящей корочкой', price: 199, category: 'snacks' }
    ],
    burgers: [
        { id: 'classic-burger', name: 'Классический бургер', description: 'Сочная говяжья котлета, свежие овощи', price: 299, category: 'burgers' },
        { id: 'cheeseburger', name: 'Чизбургер', description: 'С расплавленным сыром чеддер', price: 349, category: 'burgers' },
        { id: 'bacon-burger', name: 'Бекон бургер', description: 'С беконом, луком и специальным соусом', price: 399, category: 'burgers' },
        { id: 'cheeseburger-mini', name: 'Чизбургер мини', description: 'Меньше размер - тот же вкус', price: 199, category: 'burgers' },
        { id: 'nuggets-burger', name: 'Бургер наггетс', description: 'С куриными наггетсами', price: 329, category: 'burgers' }
    ],
    longburgers: [
        { id: 'long-cheeseburger', name: 'Лонг Чизбургер', description: 'Удлинённая булка с двойной порцией сыра', price: 449, category: 'longburgers' },
        { id: 'long-bacon', name: 'Лонг Бекон', description: 'С двойным беконом и соусом барбекю', price: 499, category: 'longburgers' },
        { id: 'long-classic', name: 'Лонг Классик', description: 'Классический вкус в длинной булке', price: 429, category: 'longburgers' }
    ],
    snacks: [
        { id: 'fries', name: 'Картофель фри', description: 'Хрустящий картофель с солью', price: 149, category: 'snacks' },
        { id: 'onion-rings', name: 'Луковые кольца', description: 'Хрустящие луковые кольца в панировке', price: 179, category: 'snacks' },
        { id: 'nuggets', name: 'Наггетсы', description: 'Куриные наггетсы с хрустящей корочкой', price: 199, category: 'snacks' },
        { id: 'cheese-sticks', name: 'Сырные палочки', description: 'Сыр моцарелла в панировке', price: 229, category: 'snacks' }
    ],
    sauces: [
        { id: 'ketchup', name: 'Кетчуп', description: 'Классический томатный соус', price: 49, category: 'sauces' },
        { id: 'mayonnaise', name: 'Майонез', description: 'Нежный майонез провансаль', price: 49, category: 'sauces' },
        { id: 'garlic-sauce', name: 'Чесночный соус', description: 'Ароматный чесночный вкус', price: 59, category: 'sauces' },
        { id: 'barbecue', name: 'Барбекю', description: 'Пикантный соус барбекю', price: 59, category: 'sauces' }
    ],
    hot: [
        { id: 'grilled-meat', name: 'Мясо на углях', description: 'Свинина, запеченная на углях', price: 299, category: 'hot' },
        { id: 'chicken-wings', name: 'Куриные крылышки', description: 'Хрустящие острые крылышки', price: 329, category: 'hot' },
        { id: 'barbecue-ribs', name: 'Рёбра барбекю', description: 'Свиные рёбра в соусе', price: 599, category: 'hot' },
        { id: 'chicken-kebab', name: 'Шашлык куриный', description: 'Сочный шашлык из курицы', price: 379, category: 'hot' }
    ],
    soups: [
        { id: 'tomato-soup', name: 'Томатный суп', description: 'Ароматный томатный суп с гренками', price: 199, category: 'soups' },
        { id: 'mushroom-soup', name: 'Грибной крем-суп', description: 'Нежный крем-суп из грибов', price: 229, category: 'soups' },
        { id: 'onion-soup', name: 'Луковый суп', description: 'Французский луковый суп с сыром', price: 249, category: 'soups' }
    ],
    hotDrinks: [
        { id: 'coffee', name: 'Кофе', description: 'Ароматный чёрный кофе', price: 99, category: 'hot-drinks' },
        { id: 'tea', name: 'Чай', description: 'Чёрный или зелёный чай', price: 79, category: 'hot-drinks' },
        { id: 'cocoa', name: 'Какао', description: 'Нежный какао с молоком', price: 129, category: 'hot-drinks' },
        { id: 'hot-chocolate', name: 'Горячий шоколад', description: 'Плотный шоколадный напиток', price: 149, category: 'hot-drinks' }
    ],
    coldDrinks: [
        { id: 'cola', name: 'Кола', description: 'Освежающий напиток', price: 99, category: 'cold-drinks' },
        { id: 'fanta', name: 'Фанта', description: 'Апельсиновый газированный напиток', price: 99, category: 'cold-drinks' },
        { id: 'sprite', name: 'Спрайт', description: 'Лимонно-лаймовый напиток', price: 99, category: 'cold-drinks' },
        { id: 'juice', name: 'Сок', description: 'Апельсиновый или яблочный сок', price: 129, category: 'cold-drinks' }
    ]
}

export const toppings = ['Бекон', 'Морковь по-корейски', 'Сыр моцарелла', 'Халапеньо', 'Сыр чеддер красный', 'Огурчик свежий', 'Огурчик маринованный']
export const sauces = ['Барбекю', 'Кисло-сладкий', 'Томатный', 'Чесночный']
export const meatToppings = ['Морковь по-корейски', 'Халапеньо', 'Огурчик маринованный', 'Огурчик свежий']