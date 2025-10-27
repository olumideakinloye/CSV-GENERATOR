-- BALALAIKATV Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    country_code VARCHAR(10) NOT NULL DEFAULT '+234',
    email_verified BOOLEAN DEFAULT FALSE,
    whatsapp_verified BOOLEAN DEFAULT FALSE,
    whatsapp_verified_at TIMESTAMP NULL,
    payment_status VARCHAR(20) DEFAULT 'pending',
    payment_reference VARCHAR(100) NULL,
    subscription_expires DATE NULL,
    subscription_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact lists table
CREATE TABLE IF NOT EXISTS contact_lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    total_contacts INTEGER DEFAULT 0,
    price_naira INTEGER DEFAULT 100000, -- ₦1000 in kobo
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Individual contacts in lists
CREATE TABLE IF NOT EXISTS list_contacts (
    id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES contact_lists(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    business_name VARCHAR(255),
    category VARCHAR(100),
    location VARCHAR(255),
    notes TEXT,
    anonymized BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payment transactions
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reference VARCHAR(100) UNIQUE NOT NULL,
    amount INTEGER NOT NULL, -- Amount in kobo
    status VARCHAR(20) DEFAULT 'pending', -- pending, success, failed
    payment_method VARCHAR(50),
    paystack_response JSON,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User downloads (track what users downloaded)
CREATE TABLE IF NOT EXISTS user_downloads (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    list_id INTEGER REFERENCES contact_lists(id) ON DELETE CASCADE,
    download_count INTEGER DEFAULT 1,
    last_download TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    metadata JSON,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_subscription ON users(subscription_active, subscription_expires);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_list_contacts_list_id ON list_contacts(list_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);

-- Insert sample contact lists
INSERT INTO contact_lists (name, description, category, total_contacts, active) VALUES
('Nigerian Vendors Network', 'Verified vendors across Lagos, Abuja, and Port Harcourt', 'vendors', 450, true),
('Social Media Influencers', 'Micro and macro influencers with 5K+ followers', 'influencers', 280, true),
('Business Owners Directory', 'SME owners across various industries', 'business', 350, true),
('Event Organizers Hub', 'Professional event planners and organizers', 'events', 120, true)
ON CONFLICT DO NOTHING;

-- Insert sample contacts (anonymized)
INSERT INTO list_contacts (list_id, name, phone, email, business_name, category, location) VALUES
(1, 'Ahmed S***', '+234801***4567', 'ahmed.s***@email.com', 'A*** Fashion Store', 'Fashion', 'Lagos'),
(1, 'Funmi A***', '+234802***7890', 'funmi.a***@email.com', 'F*** Catering', 'Food', 'Abuja'),
(1, 'David O***', '+234803***2345', 'david.o***@email.com', 'D*** Electronics', 'Electronics', 'Port Harcourt'),
(2, 'Sarah L***', '+234804***6789', 'sarah.l***@email.com', 'Beauty by S***', 'Beauty', 'Lagos'),
(2, 'Michael C***', '+234805***9876', 'michael.c***@email.com', 'Fitness with M***', 'Fitness', 'Abuja')
ON CONFLICT DO NOTHING;