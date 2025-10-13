-- Deleting existing table if exists (drop child tables before parent tables)
DROP TABLE IF EXISTS step           CASCADE;
DROP TABLE IF EXISTS production     CASCADE;
DROP TABLE IF EXISTS mine           CASCADE;
DROP TABLE IF EXISTS recipe         CASCADE;
DROP TABLE IF EXISTS machine_use    CASCADE;
DROP TABLE IF EXISTS machine        CASCADE;
DROP TABLE IF EXISTS item           CASCADE;

-- Table item
---- This table contain all the item data 
-- -- id_i          : item uniq identifier      [PK]
-- -- name_i        : item name
-- -- type_i        : type of item (0=energy, 1=water, 2=petrol, 3=solid, 4=composit)
-- -- primary_i     : boolean that say if it's a primary produce (like wood or raw iron)
-- -- qtt_w         : quantity wanted by the user
-- -- qtt_p         : quantity produced
-- -- qtt_u         : quantity used
CREATE TABLE item (
    id_i SERIAL PRIMARY KEY,
    name_i TEXT NOT NULL,
    type_i INTEGER NOT NULL,
    primary_i BOOLEAN NOT NULL DEFAULT FALSE,
    qtt_w FLOAT DEFAULT 0,
    qtt_p FLOAT DEFAULT 0,
    qtt_u FLOAT DEFAULT 0
);

-- Table machine
-- -- This table contain all the machine data
-- -- id_ma         : machine uniq identifier   [PK]
-- -- name_ma       : machine name
-- -- type_ma       : type of machine (0=energy_producer, 1=extractor, 2=fabricator, 3=other)
-- -- output_type   : type of the item at the exit of the machine (0=energy, 1=water, 2=petrol, 3=solid, 4=composit)
-- -- conso         : consumption of the machine (in MW)
CREATE TABLE machine (
    id_ma SERIAL PRIMARY KEY,
    name_ma TEXT NOT NULL,
    type_ma INTEGER NOT NULL,
    output_type INTEGER NOT NULL,
    natural_boost INTEGER NOT NULL,
    conso REAL DEFAULT 0
);

-- Table recipe 
-- -- This table contain all the recipe 
-- -- id_r          : recipe uniq identifier                [PK]
-- -- name_r        : recipe name
-- -- favorite      : boolean indicator that say if it's the favorite recipe for this item
-- -- id_ma_r       : machine id used for the recipe        [FK]
-- -- id_i_S        : item id produced in exit              [FK]
-- -- qtt_S         : quantity item exit
-- -- id_i_R1       : item id residute                      [FK]
-- -- qtt_R1        : quantity item residute
-- -- id_i_R2       : item id residute                      [FK]
-- -- qtt_R2        : quantity item residute
-- -- id_i_E0       : item id in need (energy)              [FK]
-- -- qtt_E0        : quantity item in need
-- -- id_i_E1       : item id in need                       [FK]
-- -- qtt_E1        : quantity item in need
-- -- id_i_E2       : item id in need                       [FK]
-- -- qtt_E2        : quantity item in need
-- -- id_i_E3       : item id in need                       [FK]
-- -- qtt_E3        : quantity item in need
-- -- id_i_E4       : item id in need                       [FK]
-- -- qtt_E4        : quantity item in need
CREATE TABLE recipe (
    id_r SERIAL PRIMARY KEY,
    name_r TEXT NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    id_ma_r INTEGER,
    id_i_S INTEGER,
    qtt_S INTEGER DEFAULT 0,
    id_i_R1 INTEGER,
    qtt_R1 INTEGER DEFAULT 0,
    id_i_R2 INTEGER,
    qtt_R2 INTEGER DEFAULT 0,
    id_i_E0 INTEGER,
    qtt_E0 INTEGER DEFAULT 0,
    id_i_E1 INTEGER,
    qtt_E1 INTEGER DEFAULT 0,
    id_i_E2 INTEGER,
    qtt_E2 INTEGER DEFAULT 0,
    id_i_E3 INTEGER,
    qtt_E3 INTEGER DEFAULT 0,
    id_i_E4 INTEGER,
    qtt_E4 INTEGER DEFAULT 0,
    FOREIGN KEY (id_ma_r) REFERENCES machine(id_ma),
    FOREIGN KEY (id_i_S) REFERENCES item(id_i),
    FOREIGN KEY (id_i_R1) REFERENCES item(id_i),
    FOREIGN KEY (id_i_R2) REFERENCES item(id_i),
    FOREIGN KEY (id_i_E0) REFERENCES item(id_i),
    FOREIGN KEY (id_i_E1) REFERENCES item(id_i),
    FOREIGN KEY (id_i_E2) REFERENCES item(id_i),
    FOREIGN KEY (id_i_E3) REFERENCES item(id_i),
    FOREIGN KEY (id_i_E4) REFERENCES item(id_i)
);

-- Table machine_use
-- -- id_mu         : machine_use uniq identifier                               [PK]
-- -- id_ma_mu      : machine id to identify the machine that will be use       [FK]
-- -- slug          : number of slug in the machine (0-3)
-- -- boost         : actual percentage of the machine (0-100+50*slugs)
-- -- multiplicator : boolean that indicate if the exit is boosted (3x conso of the machine)
CREATE TABLE machine_use (
    id_mu SERIAL PRIMARY KEY,
    id_ma_mu INTEGER,
    slug INTEGER DEFAULT 0,
    boost FLOAT DEFAULT 100,
    multiplicator BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_ma_mu) REFERENCES machine(id_ma)
);

-- Table mine 
-- -- id_mi         : mine uniq identifier      [PK]
-- -- name_mi       : mine name
-- -- quality       : quality multiplicator (1=impure, 2=normal, 4=pur)
-- -- id_u_mi       : machine use for the mine  [FK]
-- -- id_i_mi       : item extracted            [FK]
CREATE TABLE mine (
    id_mi SERIAL PRIMARY KEY,
    name_mi TEXT NOT NULL,
    quality INTEGER DEFAULT 1,
    id_u_mi INTEGER,
    id_i_mi INTEGER,
    FOREIGN KEY (id_u_mi) REFERENCES machine_use(id_mu),
    FOREIGN KEY (id_i_mi) REFERENCES item(id_i)
);

-- Table production 
-- -- id_p          : production uniq identifier                    [PK]
-- -- name_p        : production name 
-- -- qtt_i         : quantity of the item produced
-- -- entry_p       : boolean, say if it's an entry (the start of a production)
-- -- id_s_p        : get the step attached to this production      [FK]
CREATE TABLE production (
    id_p SERIAL PRIMARY KEY,
    name_p TEXT NOT NULL,
    qtt_i INTEGER DEFAULT 0,
    entry_p BOOLEAN DEFAULT FALSE,
    id_s_p INTEGER
    -- FOREIGN KEY (id_s_p) REFERENCES step(id_s) -- will be added later
);

-- Table step
-- -- id_s          : step uniq identifier                              [PK]
-- -- name_s        : step name 
-- -- id_mu_s       : machine used in this step                         [FK]
-- -- id_p_E0       : production of the entry 0 of the recipe (energy)  [FK]
-- -- id_p_E1       : production of the entry 1 of the recipe           [FK]
-- -- id_p_E2       : production of the entry 2 of the recipe           [FK]
-- -- id_p_E3       : production of the entry 3 of the recipe           [FK]
-- -- id_p_E4       : production of the entry 4 of the recipe           [FK]
CREATE TABLE step (
    id_s SERIAL PRIMARY KEY,
    name_s TEXT NOT NULL,
    id_mu_s INTEGER,
    id_p_E0 INTEGER,
    id_p_E1 INTEGER,
    id_p_E2 INTEGER,
    id_p_E3 INTEGER,
    id_p_E4 INTEGER,
    FOREIGN KEY (id_mu_s) REFERENCES machine_use(id_mu)
    -- FOREIGN KEYs to production will be added later
);

-- Add foreign key constraints after both tables are created to resolve circular dependency
ALTER TABLE production
    ADD CONSTRAINT fk_production_step FOREIGN KEY (id_s_p) REFERENCES step(id_s);

ALTER TABLE step
    ADD CONSTRAINT fk_step_p_e0 FOREIGN KEY (id_p_E0) REFERENCES production(id_p),
    ADD CONSTRAINT fk_step_p_e1 FOREIGN KEY (id_p_E1) REFERENCES production(id_p),
    ADD CONSTRAINT fk_step_p_e2 FOREIGN KEY (id_p_E2) REFERENCES production(id_p),
    ADD CONSTRAINT fk_step_p_e3 FOREIGN KEY (id_p_E3) REFERENCES production(id_p),
    ADD CONSTRAINT fk_step_p_e4 FOREIGN KEY (id_p_E4) REFERENCES production(id_p);
