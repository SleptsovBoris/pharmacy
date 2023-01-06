import React, { useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import logo from './assets/pharmacy_logo.png';
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/Products/Products';
import Button from 'antd/es/button';
import Badge from 'antd/es/badge';
import { IProduct } from './components/Products/components/Product';
import Modal from 'antd/es/modal/Modal';
import List from 'antd/es/list';

const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const App: React.FC = () => {
    const [cartItems, setCartItems] = useState<IProduct[]>([]);

    const [isCartOpenModal, setIsCartModalOpen] = useState(false);

    const handleAddItemToCart = (product: IProduct) => {
        if (cartItems.find((cartItem) => cartItem.id == product.id)) return;
        setCartItems([...cartItems, product]);
    };

    const handleRemoveItemFromCart = (product: IProduct) => {
        setCartItems([
            ...cartItems.filter((cartItem) => cartItem.id !== product.id),
        ]);
    };

    const handleOpenCart = () => {
        setIsCartModalOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartModalOpen(false);
    };

    return (
        <>
            {/* header */}
            <div className="header">
                <div className="logo">
                    <img className="logo__img" src={logo} alt="" />
                </div>
                <NavBar
                    items={[
                        {
                            title: 'Выбрать лекарства',
                            link: '/#products__area',
                        },
                        {
                            title: 'О нас',
                            link: '/#about__area',
                        },
                        {
                            title: 'Контакты',
                            link: '/#contacts',
                        },
                    ]}
                />
                <div className="cart__wrapper">
                    <Space>
                        <Badge count={cartItems.length}>
                            <Button
                                size="large"
                                type="text"
                                shape="circle"
                                icon={
                                    <ShoppingCartOutlined
                                        style={{
                                            fontSize: '28px',
                                            color: 'brown',
                                        }}
                                    />
                                }
                                onClick={handleOpenCart}
                            />
                        </Badge>
                    </Space>
                </div>
            </div>

            {/* body */}
            <div className="body">
                <div className="about__area" id="about__area">
                    <div className="title">О нас</div>
                    <div className="content">{loremIpsum}</div>
                </div>
                <div className="products__area" id="products__area">
                    <div className="title">Наши лекарства</div>
                    <Products handleAddItemToCart={handleAddItemToCart} />
                </div>
            </div>

            {/* footer */}
            <div className="footer">
                <div className="contacts" id="contacts">
                    Контакты:
                    <div className="contact">+7 939 947 64-32</div>
                    <div className="contact">+7 988 299 62-34</div>
                    <div className="contact">+7 932 923 19-34</div>
                </div>
                <div className="rights">
                    © Все права защищены. ООО &quot; Аптека Бориса &quot;
                </div>
            </div>
            <Modal
                open={isCartOpenModal}
                footer={null}
                onCancel={handleCloseCart}
                style={{ top: '11vh', right: '1px' }}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={cartItems}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button
                                    key={'remove button from cart'}
                                    type="default"
                                    danger
                                    onClick={() =>
                                        handleRemoveItemFromCart(item)
                                    }
                                >
                                    Удалить
                                </Button>,
                            ]}
                        >
                            {item.title}
                        </List.Item>
                    )}
                ></List>
            </Modal>
        </>
    );
};

export default App;
