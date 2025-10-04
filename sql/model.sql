-- Delete existing table to avoid conflicts
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS machine CASCADE;
DROP TABLE IF EXISTS recipe CASCADE;
DROP TABLE IF EXISTS production CASCADE;
DROP TABLE IF EXISTS mine CASCADE;


-- Create item table 
---- All items in the game that can be crafted or mined
---- id         : unique identifier for each item     | PRIMARY KEY 
---- name_i     : Name of the item
---- type_i     : type of item (0=energy; 1=raw material; 2=intermediate or final product)
---- descr      : description of the item
---- qtt_w      : quantity that we want to produce per minute
---- qtt_p      : quantity produced per minute
---- qtt_u      : quantity used per minute
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    name_i VARCHAR(100) NOT NULL,
    type_i INT NOT NULL,
    descr TEXT,
    qtt_w INT DEFAULT 0,
    qtt_p INT DEFAULT 0,
    qtt_u INT DEFAULT 0
);

-- Create machine table
---- All machines in the game that can be built to craft items
---- id         : unique identifier for each machine     | PRIMARY KEY
---- name_m     : Name of the machine
---- conso      : energy consumption of the machine (in MW) (the type define if it's energy consumption or production)
---- type_m     : type of machine (0=energy; 1=extracting; 2=crafting; 3=transporting)
---- descr      : description of the machine
CREATE TABLE machine (
    id SERIAL PRIMARY KEY,
    name_m VARCHAR(100) NOT NULL,
    conso INT NOT NULL,
    type_m INT NOT NULL,
    descr TEXT
);

-- Create recipe table 
---- All recipe in the site that can be made by machines to craft items
---- id         : unique identifier for each recipe     | PRIMARY KEY
---- name_r     : Name of the recipe
---- id_m       : machine used to craft the recipe         | FOREIGN KEY
---- id_i_in    : item used as input for the recipe        | FOREIGN KEY
---- qtt_i_in   : quantity of item used as input for the recipe
---- id_i_out1  : item produced as output of the recipe     | FOREIGN KEY
---- qtt_i_out1 : quantity of item produced as output of the recipe
---- id_i_out2  : item produced as secondary output of the recipe | FOREIGN KEY
---- qtt_i_out2 : quantity of item produced as secondary output of the recipe
---- id_i_out3  : item produced as tertiary output of the recipe | FOREIGN KEY
---- qtt_i_out3 : quantity of item produced as tertiary output of the recipe
---- id_i_out4  : item produced as quaternary output of the recipe | FOREIGN KEY
---- qtt_i_out4 : quantity of item produced as quaternary output of the recipe
---- id_i_res1  : item produced as residue output of the recipe | FOREIGN KEY
---- qtt_i_res1 : quantity of item produced as residue output of the recipe
---- id_i_res2  : item produced as secondary residue output of the recipe | FOREIGN KEY
---- qtt_i_res2 : quantity of item produced as secondary residue output of the recipe
---- Type_r     : type of recipe (0=energy; 1=extraction; 2=crafting)
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name_r VARCHAR(100) NOT NULL,
    id_m INT,
    id_i_in INT,
    qtt_i_in INT,
    id_i_out1 INT,
    qtt_i_out1 INT,
    id_i_out2 INT,
    qtt_i_out2 INT,
    id_i_out3 INT,
    qtt_i_out3 INT,
    id_i_out4 INT,
    qtt_i_out4 INT,
    id_i_res1 INT,
    qtt_i_res1 INT,
    id_i_res2 INT,
    qtt_i_res2 INT,
    FOREIGN KEY (id_m) REFERENCES machine(id),
    FOREIGN KEY (id_i_in) REFERENCES item(id),
    FOREIGN KEY (id_i_out1) REFERENCES item(id),
    FOREIGN KEY (id_i_out2) REFERENCES item(id),
    FOREIGN KEY (id_i_out3) REFERENCES item(id),
    FOREIGN KEY (id_i_out4) REFERENCES item(id),
    FOREIGN KEY (id_i_res1) REFERENCES item(id),
    FOREIGN KEY (id_i_res2) REFERENCES item(id),
    type_r INT NOT NULL
);

--- Create production table
---- All production setups created by users to produce items
---- id         : unique identifier for each production setup | PRIMARY KEY
---- name_p     : Name of the production setup
---- id_r       : recipe used in the production setup         | FOREIGN KEY
---- boost      : boost provided to the machine to respect the demand (in %)
---- qtt_p      : quantity produced per minute given by the user
---- slug       : slug used to boost the production (a slug can boost the production for 50% and only 3 of them can be used per machine)
---- qtt_m      : quantity of machines used in the production setup
---- id_N1      : id of the first needed item to produce the item (if any) | FOREIGN KEY
---- id_N2      : id of the second needed item to produce the item (if any) | FOREIGN KEY
---- id_N3      : id of the third needed item to produce the item (if any) | FOREIGN KEY
---- id_N4      : id of the fourth needed item to produce the item (if any) | FOREIGN KEY

CREATE TABLE production (
    id SERIAL PRIMARY KEY,
    name_p VARCHAR(100) NOT NULL,
    id_r INT,
    boost INT DEFAULT 0,
    slug INT DEFAULT 0,
    qtt_m INT DEFAULT 0,
    qtt_p INT DEFAULT 0,
    id_N1 INT,
    id_N2 INT,
    id_N3 INT,
    id_N4 INT,
    FOREIGN KEY (id_N1) REFERENCES item(id),
    FOREIGN KEY (id_N2) REFERENCES item(id),
    FOREIGN KEY (id_N3) REFERENCES item(id),
    FOREIGN KEY (id_N4) REFERENCES item(id),
    FOREIGN KEY (id_r) REFERENCES recipe(id)
);

-- Create table mine 
---- All mine that we have and the item they produce 
---- id         : uniq identifier of the mine 
---- name_m     : Name of the mine 
---- quality    : quality of the mine (0=impure, 1=normal, 2=pure)
---- id_m       : machine on the mine 
---- id_i       : id of the item extracted
---- boost      : boost used on the mine (in %)
---- slug       : slug used in the mine (0-3)
CREATE TABLE mine (
    id SERIAL PRIMARY KEY,
    name_m VARCHAR(100) NOT NULL,
    quality INT NOT NULL,
    id_m INT,
    id_i INT,
    boost INT,
    slug INT, 
    FOREIGN KEY (id_m) REFERENCES machine(id),
    FOREIGN KEY (id_i) REFERENCES item(id)
)