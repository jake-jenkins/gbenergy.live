import { SourceData } from "./types";

export const sourceData: SourceData = {
    WIND: {
        name: "Wind",
        type: "Fuel",
    },
    NUCLEAR: {
        name: "Nuclear",
        type: "Fuel"
    },
    CCGT: {
        name: "Gas 1",
        type: "Fuel"
    },
    BIOMASS: {
        name: "Biomass",
        type: "Fuel"
    },
    INTFR: {
        name: "France",
        type: "Interconnector"
    },
    INTVKL: {
        name: "Denmark",
        type: "Interconnector"
    },
    INTNSL: {
        name: "Norway",
        type: "Interconnector"
    },
    INTNEM: {
        name: "Belgium",
        type: "Interconnector"
    },
    INTIFA2: {
        name: "France 2",
        type: "Interconnector"
    },
    NPSHYD: {
        name: "Hyrdo",
        type: "Fuel"
    },
    OTHER: {
        name: "Other",
        type: "Fuel"
    },
    PS: {
        name: "Pumped storage",
        type: "Fuel"
    },
    COAL: {
        name: "Coal",
        type: "Fuel"
    },
    INTELEC: {
        name: "idfk",
        type: "Fuel"
    },
    INTGRNL: {
        name: "Ireland 1",
        type: "Interconnector"
    },
    INTNED: {
        name: "Netherlands",
        type: "Interconnector"
    },
    OCGT: {
        name: "Gas 2",
        type: "Fuel"
    },
    OIL: {
        name: "Oil",
        type: "Fuel"
    },
    INTIRL: {
        name: "Ireland 3",
        type: "Interconnector"
    },
    INTEW: {
        name: "Ireland 2",
        type: "Interconnector"
    },
}

export const interconnectors = ["ireland", "france", "belgium", "norway", "denmark"];
export const green = ["wind", "solar", "hydro", "nuclear", "biomass"];
export const fossil = ["gas", "oil", "coal"]