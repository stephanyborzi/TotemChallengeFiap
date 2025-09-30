import React, { useState } from 'react';
import './Medicamentos.css'; 
import { 
    FaPills, FaStethoscope, FaClipboardList, FaSoap, 
    FaSearch, FaCheck, FaTimes, FaTrashAlt, 
    FaPlus, FaMinus 
} from 'react-icons/fa';

const StatusModal = ({ status, onClose }) => {
    if (!status) return null;

    const isSuccess = status === 'success';
    const message = isSuccess 
        ? "✅ Solicitação cadastrada com sucesso! Você será chamado em breve."
        : "❌ Solicitação cancelada. O carrinho e os dados foram limpos.";
    
    const title = isSuccess ? "Solicitação Finalizada" : "Solicitação Cancelada";
    const className = isSuccess ? "success" : "error";

    return (
        <div className="modal-backdrop">
            <div className={`status-modal ${className}`}>
                <h2>{title}</h2>
                <p>{message}</p>
                <button className="primary-btn" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};
const CartItem = ({ item, updateQuantity, removeItem }) => (
    <div className="cart-item">
        <div className="item-header">
            <span className="item-name">{item.name}</span>
            <button className="delete-btn" onClick={() => removeItem(item.name)}>
                <FaTrashAlt /> 
            </button>
        </div>
        <div className="item-quantity-control">
            <label>Quantidade:</label>
            <div className="quantity-input-group">
                <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                >
                    <FaMinus /> 
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                >
                    <FaPlus /> 
                </button>
            </div>
        </div>
    </div>
);

const ProductCard = ({ product, onAddToCart }) => (
    <div className="product-card">
        <div className="card-image">
        </div>
        <div className="card-info">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-description">{product.description}</p>
            <p className={`card-stock ${product.stock <= 10 ? 'low-stock' : ''}`}>
                Estoque: **{product.stock}**
            </p>
        </div>
        <button 
            className="add-to-cart-btn" 
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
        >
            {product.stock > 0 ? <FaPlus /> : '🚫'} 
        </button>
    </div>
);

const categories = [
    { name: 'Medicamentos', ReactIcon: FaPills, description: 'Remédios e fármacos' },
    { name: 'Material Médico', ReactIcon: FaStethoscope, description: 'Equipamentos médicos' },
    { name: 'Material de Escritório', ReactIcon: FaClipboardList, description: 'Papelaria e suprimentos' },
    { name: 'Material de Limpeza', ReactIcon: FaSoap, description: 'Produtos de higiene' },
];

const products = [
    // --- MEDICAMENTOS (9 ITENS) ---
    { name: 'Paracetamol 500mg', description: '500mg - Caixa c/ 20 comprimidos', stock: 150, category: 'Medicamentos' },
    { name: 'Dipirona 500mg', description: '500mg - Caixa c/ 10 comprimidos', stock: 89, category: 'Medicamentos' },
    { name: 'Ibuprofeno 400mg', description: '400mg - Frasco c/ 15 cápsulas', stock: 45, category: 'Medicamentos' },
    { name: 'Soro Fisiológico', description: '0.9% - Frasco de 500ml', stock: 210, category: 'Medicamentos' },
    { name: 'Omeprazol 20mg', description: '20mg - Caixa c/ 30 cápsulas', stock: 7, category: 'Medicamentos' }, 
    { name: 'Amoxicilina 500mg', description: '500mg - Caixa c/ 21 comprimidos', stock: 112, category: 'Medicamentos' },
    { name: 'Buscopan Composto', description: 'Caixa c/ 20 drágeas', stock: 65, category: 'Medicamentos' },
    { name: 'Analgésico Morfina', description: 'Injetável - 10mg/ml', stock: 2, category: 'Medicamentos' }, 
    { name: 'Vitamina C', description: '1g - Tubo c/ 10 comprimidos efervescentes', stock: 180, category: 'Medicamentos' },

    // --- MATERIAL MÉDICO (9 ITENS) ---
    { name: 'Luvas Nitrilo', description: 'Tamanho M - Caixa c/ 100 un', stock: 67, category: 'Material Médico' },
    { name: 'Seringa 10ml', description: '10ml - Pacote c/ 100 unidades', stock: 45, category: 'Material Médico' },
    { name: 'Máscara Cirúrgica PFF2', description: 'Caixa c/ 20 unidades', stock: 12, category: 'Material Médico' }, 
    { name: 'Gaze Estéril', description: '10x10cm - Pacote c/ 10 un', stock: 300, category: 'Material Médico' },
    { name: 'Aspirador de Secreção', description: 'Portátil - Unidade', stock: 5, category: 'Material Médico' }, 
    { name: 'Termômetro Digital', description: 'Clínico - Unidade', stock: 55, category: 'Material Médico' },
    { name: 'Cateter Intravenoso', description: 'Calibre 20G - Caixa c/ 50 un', stock: 95, category: 'Material Médico' },
    { name: 'Esparadrapo', description: '10cm x 4,5m - Rolo', stock: 130, category: 'Material Médico' },
    { name: 'Escalpe N. 23', description: 'Infantil - Caixa c/ 100 un', stock: 22, category: 'Material Médico' },

    // --- MATERIAL DE ESCRITÓRIO (9 ITENS) ---
    { name: 'Papel A4', description: '75g - Resma c/ 500 folhas', stock: 25, category: 'Material de Escritório' },
    { name: 'Caneta Esferográfica Azul', description: 'Pacote c/ 10 unidades', stock: 95, category: 'Material de Escritório' },
    { name: 'Bloco de Anotações', description: 'A5 - 100 folhas', stock: 15, category: 'Material de Escritório' },
    { name: 'Toner Preto HP', description: 'Compatível - Unidade', stock: 4, category: 'Material de Escritório' }, 
    { name: 'Clipes de Papel', description: 'Número 8 - Caixa c/ 100 un', stock: 180, category: 'Material de Escritório' },
    { name: 'Pastas de Arquivo', description: 'Cor Azul - Pacote c/ 10 un', stock: 50, category: 'Material de Escritório' },
    { name: 'Fita Adesiva Grande', description: '48mm x 50m - Rolo', stock: 70, category: 'Material de Escritório' },
    { name: 'Pincel Marcador Permanente', description: 'Cor Preta - Unidade', stock: 35, category: 'Material de Escritório' },
    { name: 'Etiquetas Adesivas', description: 'P/ Impressora - Pacote c/ 200 un', stock: 110, category: 'Material de Escritório' },

    // --- MATERIAL DE LIMPEZA (9 ITENS) ---
    { name: 'Álcool 70%', description: '1L - Frasco spray', stock: 8, category: 'Material de Limpeza' }, 
    { name: 'Sabão Líquido Neutro', description: '5L - Galão', stock: 35, category: 'Material de Limpeza' },
    { name: 'Desinfetante Hospitalar', description: '5L - Concentrado', stock: 40, category: 'Material de Limpeza' },
    { name: 'Papel Toalha Interfolha', description: 'Fardo c/ 6 pacotes', stock: 99, category: 'Material de Limpeza' },
    { name: 'Luvas de Borracha', description: 'Tamanho G - Par', stock: 15, category: 'Material de Limpeza' },
    { name: 'Lixeira c/ Pedal', description: '15 Litros - Unidade', stock: 3, category: 'Material de Limpeza' }, 
    { name: 'Água Sanitária', description: '2L - Frasco', stock: 75, category: 'Material de Limpeza' },
    { name: 'Saco de Lixo Infectante', description: '100 Litros - Rolo c/ 20 un', stock: 160, category: 'Material de Limpeza' },
    { name: 'Detergente Enzimático', description: '1L - Solução para instrumentais', stock: 28, category: 'Material de Limpeza' },
];

const SelfServiceSystem = () => {
    const [selectedCategory, setSelectedCategory] = useState('Medicamentos');
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [applicantData, setApplicantData] = useState({
        name: '',
        registration: '',
        sector: '',
    });
    const [requestStatus, setRequestStatus] = useState(null); 
    const handleApplicantChange = (e) => {
        const { name, value } = e.target;
        setApplicantData(prevData => ({ ...prevData, [name]: value }));
    };
    const resetSystem = () => {
        setCart([]);
        setApplicantData({ name: '', registration: '', sector: '' });
    };
    
    const handleCloseModal = () => {
        setRequestStatus(null);
    };
    const addToCart = (productToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.name === productToAdd.name);

            if (existingItem) {
                return prevCart.map(item =>
                    item.name === productToAdd.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { name: productToAdd.name, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (itemName, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(itemName);
            return;
        }

        setCart(prevCart => {
            return prevCart.map(item =>
                item.name === itemName
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    };

    const removeItem = (itemName) => {
        setCart(prevCart => prevCart.filter(item => item.name !== itemName));
    };
    const handleFinalizeRequest = () => {
        if (cart.length === 0) {
            alert("O carrinho está vazio. Adicione itens para finalizar a solicitação.");
            return;
        }
        if (!applicantData.name || !applicantData.registration || !applicantData.sector) {
            alert("Preencha todos os dados do solicitante (Nome, Matrícula e Setor).");
            return;
        }
        console.log("Solicitação Finalizada. Dados Enviados:", {
            applicant: applicantData,
            items: cart
        });
        
        setRequestStatus('success');
        resetSystem();
    };
    
    const handleCancelRequest = () => {
        setRequestStatus('cancelled');
        resetSystem();
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    return (
        <div className="self-service-system">
            <StatusModal status={requestStatus} onClose={handleCloseModal} />
            
            <header className="app-header">
                <h1>Sistema de Autoatendimento - Almoxarifado</h1>
                <span>{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</span>
            </header>

            <main className="content-container">
                <aside className="sidebar-nav">
                    <h2>Categorias</h2>
                    <nav className="category-list">
                        {categories.map(cat => (
                            <button
                                key={cat.name}
                                className={`category-item ${selectedCategory === cat.name ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(cat.name);
                                    setSearchTerm('');
                                }}
                            >
                                <span className="icon">
                                    <cat.ReactIcon />
                                </span> 
                                <div className="category-text">
                                    <strong>{cat.name}</strong>
                                    <span>{cat.description}</span>
                                </div>
                            </button>
                        ))}
                    </nav>
                </aside>

                <section className="product-catalog">
                    <div className="search-bar">
                        <FaSearch /> 
                        <input 
                            type="text" 
                            placeholder={`Buscar em ${selectedCategory}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="product-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard 
                                    key={product.name} 
                                    product={product} 
                                    onAddToCart={addToCart} 
                                />
                            ))
                        ) : (
                            <p className="no-products">Nenhum produto encontrado na categoria **{selectedCategory}**.</p>
                        )}
                    </div>
                </section>

                <aside className="shopping-cart-sidebar">
                    <h2>Carrinho de Solicitação ({cart.length} itens)</h2>

                    <div className="cart-items-list">
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <CartItem 
                                    key={item.name} 
                                    item={item} 
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))
                        ) : (
                            <p className="empty-cart-message">O carrinho está vazio. Adicione itens para começar a solicitação.</p>
                        )}
                    </div>

                    <div className="applicant-data">
                        <h3>Dados do Solicitante</h3>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Nome completo" 
                            value={applicantData.name} 
                            onChange={handleApplicantChange} 
                        />
                        <input 
                            type="text" 
                            name="registration" 
                            placeholder="Matrícula" 
                            value={applicantData.registration} 
                            onChange={handleApplicantChange} 
                        />
                        <select 
                            name="sector" 
                            value={applicantData.sector} 
                            onChange={handleApplicantChange}
                        >
                            <option value="">Selecione o setor</option>
                            <option value="uti">UTI</option>
                            <option value="emergencia">Emergência</option>
                            <option value="enfermaria">Enfermaria</option>
                        </select>
                    </div>

                    <div className="cart-actions">
                        <button 
                            className="primary-btn" 
                            onClick={handleFinalizeRequest} 
                            disabled={cart.length === 0} 
                        >
                            <FaCheck /> Finalizar Solicitação 
                        </button>
                        
                        <button 
                            className="secondary-btn" 
                            onClick={handleCancelRequest}
                            disabled={cart.length === 0 && !applicantData.name && !applicantData.registration}
                        >
                            <FaTimes /> Cancelar 
                        </button>
                    </div>
                </aside>
            </main>

            <footer className="app-footer">
                <span>© 2025 Hospital - Sistema de Autoatendimento</span>
                <span>Suporte: (11) 9999-9999</span>
            </footer>
        </div>
    );
};

export default SelfServiceSystem;