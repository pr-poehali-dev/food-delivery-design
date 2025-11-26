import { useState } from 'react';
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

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-secondary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl">🚴</div>
              <div>
                <h1 className="text-2xl font-bold text-secondary">4 ВКУСА</h1>
                <p className="text-sm text-secondary/70">Доставка еды</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className={`text-secondary hover:text-primary transition-colors ${activeSection === 'home' ? 'font-bold' : ''}`}>Главная</button>
              <button onClick={() => scrollToSection('menu')} className={`text-secondary hover:text-primary transition-colors ${activeSection === 'menu' ? 'font-bold' : ''}`}>Меню</button>
              <button onClick={() => scrollToSection('promotions')} className={`text-secondary hover:text-primary transition-colors ${activeSection === 'promotions' ? 'font-bold' : ''}`}>Акции</button>
              <button onClick={() => scrollToSection('delivery')} className={`text-secondary hover:text-primary transition-colors ${activeSection === 'delivery' ? 'font-bold' : ''}`}>Доставка</button>
              <button onClick={() => scrollToSection('about')} className={`text-secondary hover:text-primary transition-colors ${activeSection === 'about' ? 'font-bold' : ''}`}>О нас</button>
              <button onClick={() => scrollToSection('contacts')} className={`text-secondary hover:text-primary transition-colors ${activeSection === 'contacts' ? 'font-bold' : ''}`}>Контакты</button>
            </nav>

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
          </div>
        </div>
      </header>

      <section id="home" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-6">
              <img src="https://cdn.poehali.dev/files/d0ac4208-10d5-4f43-b37e-a54833feaec7.jpg" alt="4 Вкуса" className="w-48 h-48 mx-auto rounded-full shadow-2xl" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-secondary mb-6">
              Доставка вкусной еды<br />за 30 минут
            </h2>
            <p className="text-xl text-secondary/80 mb-8 max-w-2xl mx-auto">
              Пицца, суши, бургеры и многое другое — горячим и свежим прямо к вашей двери
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8" onClick={() => scrollToSection('menu')}>
                Смотреть меню
                <Icon name="ChevronRight" size={24} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                Позвонить
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="promotions" className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-secondary mb-12">🔥 Акции и спецпредложения</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/30 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🎁</div>
                <CardTitle className="text-secondary">Бесплатная доставка</CardTitle>
                <CardDescription>При заказе от 1000 ₽</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-primary/30 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">🍕</div>
                <CardTitle className="text-secondary">Две пиццы по цене одной</CardTitle>
                <CardDescription>Каждый вторник с 12:00 до 18:00</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-primary/30 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-secondary">Скидка 20% первый заказ</CardTitle>
                <CardDescription>Для новых клиентов по промокоду NEW20</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-secondary mb-4">Наше меню</h2>
          <p className="text-center text-secondary/70 mb-12 text-lg">Выбирайте любимые блюда и добавляйте в корзину</p>

          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {['Все', 'Пицца', 'Бургеры', 'Суши', 'Напитки'].map((cat, idx) => (
              <Button key={idx} variant={idx === 0 ? 'default' : 'outline'} className={idx === 0 ? 'bg-primary hover:bg-primary/90 text-white' : 'border-secondary text-secondary hover:bg-secondary hover:text-white'}>
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, idx) => (
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

      <section id="delivery" className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Быстро</h3>
              <p className="text-white/80">Доставим горячим за 30-40 минут или бесплатно</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Удобно</h3>
              <p className="text-white/80">Оплата наличными или картой курьеру, онлайн</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Везде</h3>
              <p className="text-white/80">Доставка по всему городу без выходных</p>
            </div>
          </div>
          <div className="mt-12 max-w-2xl mx-auto bg-white/10 backdrop-blur rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4">Зоны доставки</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Icon name="Check" size={20} className="text-primary" />
                <span>Центральный район — бесплатно от 500 ₽</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={20} className="text-primary" />
                <span>Остальные районы — бесплатно от 1000 ₽</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={20} className="text-primary" />
                <span>Минимальный заказ — 300 ₽</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-secondary mb-6">О нас</h2>
            <p className="text-lg text-secondary/80 mb-6">
              "4 ВКУСА" — это сервис доставки еды, который работает для вас каждый день. Мы готовим блюда из свежих продуктов и доставляем их максимально быстро.
            </p>
            <p className="text-lg text-secondary/80 mb-8">
              Наша команда профессиональных поваров и курьеров делает всё возможное, чтобы вы получали горячую и вкусную еду точно в срок.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-secondary/70">Довольных клиентов</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-secondary/70">Блюд в меню</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">30 мин</div>
                <p className="text-secondary/70">Среднее время доставки</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-secondary mb-12">Контакты</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-secondary">Телефон</CardTitle>
                      <CardDescription className="text-lg">+7 (999) 123-45-67</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-secondary">Режим работы</CardTitle>
                      <CardDescription className="text-lg">Ежедневно с 10:00 до 23:00</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-secondary">Адрес</CardTitle>
                      <CardDescription className="text-lg">г. Москва, ул. Примерная, д. 1</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
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

export default Index;
