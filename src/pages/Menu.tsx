import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Menu = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 1, name: 'Пепперони', description: 'Острая пепперони, моцарелла, томатный соус', price: 450, category: 'pizza', image: '🍕' },
    { id: 2, name: 'Маргарита', description: 'Моцарелла, томаты, базилик, оливковое масло', price: 380, category: 'pizza', image: '🍕' },
    { id: 3, name: 'Четыре сыра', description: 'Моцарелла, пармезан, горгонзола, чеддер', price: 520, category: 'pizza', image: '🍕' },
    { id: 4, name: 'Классический бургер', description: 'Говяжья котлета, салат, помидор, сыр, соус', price: 320, category: 'burgers', image: '🍔' },
    { id: 5, name: 'Чизбургер', description: 'Двойная котлета, двойной сыр, специальный соус', price: 390, category: 'burgers', image: '🍔' },
    { id: 6, name: 'Филадельфия', description: 'Лосось, сливочный сыр, огурец, авокадо', price: 480, category: 'sushi', image: '🍣' },
    { id: 7, name: 'Калифорния', description: 'Краб, авокадо, огурец, икра тобико', price: 420, category: 'sushi', image: '🍣' },
    { id: 8, name: 'Кока-кола', description: 'Освежающий напиток 0.5л', price: 120, category: 'drinks', image: '🥤' },
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredMenuItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'pizza', label: 'Пицца' },
    { id: 'burgers', label: 'Бургеры' },
    { id: 'sushi', label: 'Суши' },
    { id: 'drinks', label: 'Напитки' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-5xl">🚴</div>
              <div>
                <h1 className="text-2xl font-bold text-secondary">4 ВКУСА</h1>
                <p className="text-sm text-secondary/70">Доставка еды</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-secondary hover:text-primary transition-colors">Главная</Link>
              <Link to="/menu" className="text-secondary hover:text-primary transition-colors font-bold">Меню</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="relative bg-primary hover:bg-primary/90 text-white">
                    <Icon name="ShoppingCart" size={20} />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-secondary text-white border-0 px-2">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                    <SheetDescription>
                      {totalItems > 0 ? `${totalItems} ${totalItems === 1 ? 'товар' : 'товара'}` : 'Корзина пуста'}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-muted-foreground">Добавьте товары в корзину</p>
                      </div>
                    ) : (
                      <>
                        {cart.map(item => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-2xl">{item.image}</span>
                                    <h3 className="font-semibold">{item.name}</h3>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{item.price} ₽</p>
                                  <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                                  <Icon name="Trash2" size={18} className="text-destructive" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
                            Оформить заказ
                            <Icon name="ArrowRight" size={20} className="ml-2" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={24} className="text-secondary" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">🚴</div>
                        <div>
                          <h2 className="text-xl font-bold text-secondary">4 ВКУСА</h2>
                          <p className="text-xs text-secondary/70">Доставка еды</p>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link to="/" className="text-lg text-secondary hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                      Главная
                    </Link>
                    <Link to="/menu" className="text-lg text-secondary hover:text-primary transition-colors py-2 font-bold" onClick={() => setMobileMenuOpen(false)}>
                      Меню
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-secondary mb-4">Наше меню</h2>
          <p className="text-center text-secondary/70 mb-12 text-lg">Выбирайте любимые блюда и добавляйте в корзину</p>

          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Button 
                key={cat.id} 
                variant={activeCategory === cat.id ? 'default' : 'outline'} 
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? 'bg-primary hover:bg-primary/90 text-white' : 'border-secondary text-secondary hover:bg-secondary hover:text-white'}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredMenuItems.map((item, idx) => (
              <Card key={item.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="text-6xl mb-3 text-center">{item.image}</div>
                  <CardTitle className="text-secondary">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                  <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => addToCart(item)}>
                    <Icon name="Plus" size={18} className="mr-1" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🚴</div>
              <div>
                <h3 className="text-xl font-bold">4 ВКУСА</h3>
                <p className="text-sm text-white/70">Доставка еды</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/70">© 2024 4 ВКУСА. Все права защищены.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
