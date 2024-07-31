export interface Naves {
    url: string;
    name: string;
    model: string;
}

export interface Nave extends Naves {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
    pilots: Pilot[];
    films: Film[];
    created: string;
    edited: string;
    url: string;
}

export interface Pilot {
    id: string;
    name: string;
    imagenUrl: string;
}

export interface Film {
    id: string;
    title: string;
    imagenUrl: string;
}


