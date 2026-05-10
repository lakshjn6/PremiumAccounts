import { useState, useEffect } from "react";

const plans = [
  {
    id: "spotify",
    name: "Spotify Premium",
    icon: "🎵",
    color: "#1DB954",
    bg: "#0d1a10",
    tagline: "Music for everyone",
    plans: [
      {
        name: "Individual",
        price: 299,
        duration: "1 Month",
        features: ["Ad-free music", "Offline downloads", "HD audio"],
      },
      {
        name: "Duo",
        price: 499,
        duration: "1 Month",
        features: ["2 accounts", "Duo Mix playlist", "All Individual perks"],
      },
      {
        name: "Family",
        price: 699,
        duration: "1 Month",
        features: ["6 accounts", "Parental controls", "All Duo perks"],
      },
    ],
  },
  {
    id: "claude",
    name: "Claude Pro",
    icon: "🤖",
    color: "#D4A96A",
    bg: "#1a1510",
    tagline: "AI at your fingertips",
    plans: [
      {
        name: "Pro",
        price: 1499,
        duration: "1 Month",
        features: ["Priority access", "Extended context", "Early features"],
      },
      {
        name: "Team",
        price: 2499,
        duration: "1 Month",
        features: ["5 seats", "Admin dashboard", "All Pro perks"],
      },
      {
        name: "Enterprise",
        price: 8999,
        duration: "1 Month",
        features: ["Unlimited seats", "Custom workflows", "Dedicated support"],
      },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    icon: "💬",
    color: "#10A37F",
    bg: "#0d1a16",
    tagline: "GPT-4 unleashed",
    plans: [
      {
        name: "Plus",
        price: 1699,
        duration: "1 Month",
        features: ["GPT-4 access", "DALL·E 3", "Faster responses"],
      },
      {
        name: "Team",
        price: 2999,
        duration: "1 Month",
        features: ["5 seats", "Data privacy", "All Plus perks"],
      },
      {
        name: "Enterprise",
        price: 9999,
        duration: "1 Month",
        features: ["Custom GPTs", "SSO", "Unlimited usage"],
      },
    ],
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    icon: "▶️",
    color: "#FF0000",
    bg: "#1a0d0d",
    tagline: "Watch without limits",
    plans: [
      {
        name: "Individual",
        price: 179,
        duration: "1 Month",
        features: ["Ad-free videos", "Background play", "YouTube Music"],
      },
      {
        name: "Family",
        price: 299,
        duration: "1 Month",
        features: ["6 accounts", "All Individual perks", "Family sharing"],
      },
      {
        name: "Student",
        price: 89,
        duration: "1 Month",
        features: [
          "Verified students",
          "All Premium features",
          "Discounted rate",
        ],
      },
    ],
  },
];

const listings = [
  {
    id: 1,
    service: "spotify",
    plan: "Family",
    seller: "TechDeals_IN",
    price: 580,
    originalPrice: 699,
    rating: 4.9,
    reviews: 234,
    badge: "Top Seller",
    type: "sell",
  },
  {
    id: 2,
    service: "claude",
    plan: "Pro",
    seller: "AIAccounts",
    price: 1200,
    originalPrice: 1499,
    rating: 4.7,
    reviews: 89,
    badge: "Verified",
    type: "sell",
  },
  {
    id: 3,
    service: "youtube",
    plan: "Family",
    seller: "PremiumHub",
    price: 240,
    originalPrice: 299,
    rating: 4.8,
    reviews: 456,
    badge: "Hot Deal",
    type: "sell",
  },
  {
    id: 4,
    service: "chatgpt",
    plan: "Plus",
    seller: "AIMarket",
    price: 1399,
    originalPrice: 1699,
    rating: 4.6,
    reviews: 112,
    badge: "Verified",
    type: "sell",
  },
];

export default function App() {
  const [page, setPage] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("buy");
  const [selectedService, setSelectedService] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [heroAnim, setHeroAnim] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [sellForm, setSellForm] = useState({
    service: "spotify",
    plan: "",
    price: "",
    duration: "",
  });

  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    setTimeout(() => setHeroAnim(true), 100);
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (authMode === "register") {
      if (form.password !== form.confirm) {
        return showToast("Passwords don't match!", "error");
      }

      setUser({
        name: form.name,
        email: form.email,
        avatar: form.name[0].toUpperCase(),
      });

      showToast(`Welcome ${form.name}`);
      setPage("dashboard");
    } else {
      const name = form.email.split("@")[0];

      setUser({
        name,
        email: form.email,
        avatar: name[0].toUpperCase(),
      });

      showToast(`Welcome back ${name}`);
      setPage("dashboard");
    }
  };

  const addToCart = (listing) => {
    if (!user) {
      setPage("auth");
      return;
    }

    if (cartItems.find((i) => i.id === listing.id)) {
      return showToast("Already added", "error");
    }

    setCartItems([...cartItems, listing]);
    showToast("Added to cart");
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
  };

  const handleSell = (e) => {
    e.preventDefault();

    const newListing = {
      id: Date.now(),
      service: sellForm.service,
      plan: sellForm.plan,
      seller: user.name,
      price: parseInt(sellForm.price),
      originalPrice: parseInt(sellForm.price) + 50,
      rating: 5,
      reviews: 0,
      badge: "New",
      type: "sell",
    };

    setMyListings([...myListings, newListing]);

    setSellForm({
      service: "spotify",
      plan: "",
      price: "",
      duration: "",
    });

    showToast("Listed Successfully");
  };

  const filteredListings = [...listings, ...myListings].filter(
    (l) => selectedService === "all" || l.service === selectedService
  );

  const totalCart = cartItems.reduce((s, i) => s + i.price, 0);

  return (
    <div
      style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        color: "#fff",
        overflowX: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
      
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

      *{
        box-sizing:border-box;
      }

      body{
        margin:0;
        overflow-x:hidden;
      }

      button{
        cursor:pointer;
      }

      .hero-btn{
        transition:0.3s;
      }

      .hero-btn:hover{
        transform:translateY(-3px);
      }

      .listing-card{
        background:rgba(255,255,255,0.03);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:18px;
        overflow:hidden;
        transition:0.3s;
      }

      .listing-card:hover{
        transform:translateY(-5px);
      }

      .buy-btn{
        width:100%;
        border:none;
        padding:13px;
        border-radius:10px;
        background:linear-gradient(135deg,#C8A96E,#a07840);
        color:white;
        font-weight:600;
      }

      .sell-input{
        width:100%;
        background:rgba(255,255,255,0.05);
        border:1px solid rgba(255,255,255,0.1);
        color:white;
        padding:14px;
        border-radius:10px;
        outline:none;
      }

      .filter-pill{
        padding:8px 16px;
        border-radius:30px;
        background:transparent;
        border:1px solid rgba(255,255,255,0.1);
        color:#aaa;
      }

      .filter-pill.active{
        border-color:#C8A96E;
        color:#C8A96E;
      }

      .plan-card{
        border-radius:18px;
        padding:24px;
        border:1px solid rgba(255,255,255,0.08);
      }

      @media(max-width:768px){

        nav{
          padding:16px !important;
          flex-wrap:wrap;
          gap:16px;
        }

        h1{
          font-size:34px !important;
          line-height:1.2 !important;
        }

        .hero-buttons{
          flex-direction:column;
          width:100%;
        }

        .hero-buttons button{
          width:100%;
        }

        .market-grid{
          grid-template-columns:1fr !important;
        }

        .plans-grid{
          grid-template-columns:1fr !important;
        }

        .cart-panel{
          width:100% !important;
        }

        .navbar-tabs{
          width:100%;
          justify-content:center;
          flex-wrap:wrap;
        }

        .user-section{
          width:100%;
          justify-content:space-between;
        }

        .hero-stats{
          gap:24px !important;
        }

        .service-pills{
          justify-content:center;
        }

      }

      `}</style>

      {/* TOAST */}

      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 999,
            background:
              toast.type === "error" ? "#c0392b" : "rgba(20,80,30,0.95)",
            padding: "14px 18px",
            borderRadius: 12,
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* LANDING */}

      {page === "landing" && (
        <>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              backdropFilter: "blur(20px)",
              background: "rgba(10,10,15,0.8)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              padding: "20px 40px",
            }}
          >
            <div
              onClick={() => setPage("landing")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Premium
              <span style={{ color: "#C8A96E" }}>Bazaar</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="hero-btn"
                onClick={() => setPage("dashboard")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                }}
              >
                Browse
              </button>

              <button
                className="hero-btn"
                onClick={() => {
                  setAuthMode("login");
                  setPage("auth");
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                }}
              >
                Login
              </button>

              <button
                className="hero-btn"
                onClick={() => {
                  setAuthMode("register");
                  setPage("auth");
                }}
                style={{
                  background: "linear-gradient(135deg,#C8A96E,#a07840)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 10,
                }}
              >
                Get Started
              </button>
            </div>
          </nav>

          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "120px 20px 60px",
            }}
          >
            <div>
              <div
                style={{
                  color: "#C8A96E",
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                India's #1 Premium Account Marketplace
              </div>


              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(38px,10vw,90px)",
                  marginBottom: 20,
                  lineHeight: 1.1,
                }}
              >
                Buy & Sell <br />
                Premium Accounts
              </h1>



              <p
                style={{
                  color: "#888",
                  maxWidth: 650,
                  margin: "0 auto 40px",
                  lineHeight: 1.7,
                }}
              >
                Spotify, Claude, ChatGPT and YouTube Premium marketplace
                experience with modern UI and trusted sellers.
              </p>

              <div
                className="hero-buttons"
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="hero-btn"
                  onClick={() => setPage("dashboard")}
                  style={{
                    background: "linear-gradient(135deg,#C8A96E,#a07840)",
                    border: "none",
                    color: "#fff",
                    padding: "16px 28px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Browse Deals
                </button>

                <button
                  className="hero-btn"
                  onClick={() => {
                    setAuthMode("register");
                    setPage("auth");
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                    padding: "16px 28px",
                    borderRadius: 12,
                  }}
                >
                  Start Selling
                </button>
              </div>

              <div
                className="service-pills"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginTop: 60,
                }}
              >
                {plans.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: "14px 20px",
                    }}
                  >
                    {p.icon} {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* AUTH */}

      {page === "auth" && (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "32px 20px",
            }}
          >
            <button
              onClick={() => setPage("landing")}
              style={{
                background: "none",
                border: "none",
                color: "#888",
                marginBottom: 20,
              }}
            >
              ← Back
            </button>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 34,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              {authMode === "login" ? "Login" : "Register"}
            </h2>

            <form
              onSubmit={handleAuth}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {authMode === "register" && (
                <input
                  className="sell-input"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              )}

              <input
                className="sell-input"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                className="sell-input"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {authMode === "register" && (
                <input
                  className="sell-input"
                  placeholder="Confirm Password"
                  type="password"
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                />
              )}

              <button
                style={{
                  background: "linear-gradient(135deg,#C8A96E,#a07840)",
                  border: "none",
                  padding: "14px",
                  borderRadius: 10,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {authMode === "login" ? "Login" : "Create Account"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <span
                style={{ color: "#C8A96E", cursor: "pointer" }}
                onClick={() =>
                  setAuthMode(
                    authMode === "login" ? "register" : "login"
                  )
                }
              >
                {authMode === "login"
                  ? "Create new account"
                  : "Already have account"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD */}

      {page === "dashboard" && (
        <>
          {/* NAVBAR */}

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 28px",
              position: "sticky",
              top: 0,
              background: "rgba(10,10,15,0.9)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              zIndex: 100,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Premium
              <span style={{ color: "#C8A96E" }}>Bazaar</span>
            </div>

            <div
              className="navbar-tabs"
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {["buy", "sell", "plans"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    background:
                      activeTab === t
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                    border: "none",
                    color: activeTab === t ? "#fff" : "#888",
                    padding: "10px 16px",
                    borderRadius: 10,
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            <div
              className="user-section"
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setCartOpen(true)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  color: "#fff",
                  padding: "10px 14px",
                  borderRadius: 10,
                }}
              >
                🛒 {cartItems.length}
              </button>

              {user ? (
                <>
                  <div>{user.name}</div>

                  <button
                    onClick={() => {
                      setUser(null);
                      setPage("landing");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#888",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setPage("auth")}
                  style={{
                    background:
                      "linear-gradient(135deg,#C8A96E,#a07840)",
                    border: "none",
                    color: "#fff",
                    padding: "10px 16px",
                    borderRadius: 10,
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </nav>

          {/* CART */}

          {cartOpen && (
            <div
              onClick={() => setCartOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 300,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                className="cart-panel"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 380,
                  background: "#111",
                  padding: 24,
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <h2>Your Cart</h2>

                  <button
                    onClick={() => setCartOpen(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                    }}
                  >
                    ✕
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      padding: 14,
                      borderRadius: 12,
                      marginBottom: 12,
                    }}
                  >
                    {item.plan} — ₹{item.price}
                  </div>
                ))}

                <div
                  style={{
                    marginTop: 20,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: 20,
                  }}
                >
                  <div
                    style={{
                      marginBottom: 16,
                      fontSize: 20,
                    }}
                  >
                    Total ₹{totalCart}
                  </div>

                  <button
                    className="buy-btn"
                    onClick={() => {
                      setCartItems([]);
                      setCartOpen(false);
                      showToast("Order placed");
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              maxWidth: 1250,
              margin: "0 auto",
              padding: "40px 20px",
            }}
          >
            {/* BUY */}

            {activeTab === "buy" && (
              <>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 10,
                  }}
                >
                  Marketplace
                </h1>

                <p style={{ color: "#777", marginBottom: 30 }}>
                  Premium accounts from trusted sellers
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 30,
                  }}
                >
                  {[
                    ["all", "All"],
                    ...plans.map((p) => [p.id, p.name]),
                  ].map(([v, l]) => (
                    <button
                      key={v}
                      className={`filter-pill ${selectedService === v ? "active" : ""
                        }`}
                      onClick={() => setSelectedService(v)}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                <div
                  className="market-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(260px,1fr))",
                    gap: 20,
                  }}
                >
                  {filteredListings.map((listing) => {
                    const svc = plans.find(
                      (p) => p.id === listing.service
                    );

                    return (
                      <div
                        key={listing.id}
                        className="listing-card"
                      >
                        <div
                          style={{
                            padding: 20,
                            borderBottom:
                              "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 10,
                              flexWrap: "wrap",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 34 }}>
                                {svc.icon}
                              </div>

                              <div
                                style={{
                                  fontWeight: 600,
                                  marginTop: 10,
                                }}
                              >
                                {svc.name}
                              </div>

                              <div
                                style={{
                                  color: "#888",
                                  fontSize: 14,
                                }}
                              >
                                {listing.plan}
                              </div>
                            </div>

                            {listing.badge && (
                              <div
                                style={{
                                  background:
                                    "rgba(200,169,110,0.15)",
                                  color: "#C8A96E",
                                  padding: "6px 10px",
                                  borderRadius: 20,
                                  height: "fit-content",
                                  fontSize: 12,
                                }}
                              >
                                {listing.badge}
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ padding: 20 }}>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 10,
                              alignItems: "center",
                              marginBottom: 12,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 28,
                                fontWeight: 700,
                                color: svc.color,
                              }}
                            >
                              ₹{listing.price}
                            </div>

                            <div
                              style={{
                                textDecoration: "line-through",
                                color: "#666",
                              }}
                            >
                              ₹{listing.originalPrice}
                            </div>
                          </div>

                          <div
                            style={{
                              color: "#777",
                              marginBottom: 16,
                            }}
                          >
                            Seller: {listing.seller}
                          </div>

                          <button
                            className="buy-btn"
                            onClick={() => addToCart(listing)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* SELL */}

            {activeTab === "sell" && (
              <div style={{ maxWidth: 650, margin: "0 auto" }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 10,
                  }}
                >
                  Sell Account
                </h1>

                <p style={{ color: "#777", marginBottom: 30 }}>
                  List your premium account
                </p>

                {!user ? (
                  <div
                    style={{
                      padding: 30,
                      borderRadius: 20,
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    Please login first
                  </div>
                ) : (
                  <form
                    onSubmit={handleSell}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                    }}
                  >
                    <select
                      className="sell-input"
                      value={sellForm.service}
                      onChange={(e) =>
                        setSellForm({
                          ...sellForm,
                          service: e.target.value,
                        })
                      }
                    >
                      {plans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    <input
                      className="sell-input"
                      placeholder="Plan"
                      value={sellForm.plan}
                      onChange={(e) =>
                        setSellForm({
                          ...sellForm,
                          plan: e.target.value,
                        })
                      }
                    />

                    <input
                      className="sell-input"
                      placeholder="Price"
                      type="number"
                      value={sellForm.price}
                      onChange={(e) =>
                        setSellForm({
                          ...sellForm,
                          price: e.target.value,
                        })
                      }
                    />

                    <button className="buy-btn">
                      List Account
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* PLANS */}

            {activeTab === "plans" && (
              <>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: 10,
                  }}
                >
                  Official Plans
                </h1>

                <p style={{ color: "#777", marginBottom: 40 }}>
                  Compare all plans
                </p>

                {plans.map((svc) => (
                  <div key={svc.id} style={{ marginBottom: 50 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        marginBottom: 20,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ fontSize: 38 }}>
                        {svc.icon}
                      </div>

                      <div>
                        <h2>{svc.name}</h2>

                        <div style={{ color: "#777" }}>
                          {svc.tagline}
                        </div>
                      </div>
                    </div>

                    <div
                      className="plans-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit,minmax(240px,1fr))",
                        gap: 20,
                      }}
                    >
                      {svc.plans.map((p) => (
                        <div
                          key={p.name}
                          className="plan-card"
                        >
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              marginBottom: 10,
                            }}
                          >
                            {p.name}
                          </div>

                          <div
                            style={{
                              fontSize: 34,
                              color: svc.color,
                              fontWeight: 700,
                              marginBottom: 6,
                            }}
                          >
                            ₹{p.price}
                          </div>

                          <div
                            style={{
                              color: "#777",
                              marginBottom: 20,
                            }}
                          >
                            / {p.duration}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                              marginBottom: 24,
                            }}
                          >
                            {p.features.map((f) => (
                              <div key={f}>✓ {f}</div>
                            ))}
                          </div>

                          <button
                            className="buy-btn"
                            onClick={() => {
                              setActiveTab("buy");
                              setSelectedService(svc.id);
                            }}
                          >
                            Buy Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}