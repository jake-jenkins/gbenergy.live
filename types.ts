type Source = {
    name: string,
    type: string
}

export type SourceData = {
    WIND: Source,
    NUCLEAR: Source,
    CCGT: Source,
    BIOMASS: Source,
    INTFR: Source,
    INTVKL: Source,
    INTNSL: Source,
    INTNEM: Source,
    INTIFA2: Source,
    NPSHYD: Source,
    OTHER: Source,
    PS: Source,
    COAL: Source,
    INTELEC: Source,
    INTGRNL: Source,
    INTNED: Source,
    OCGT: Source,
    OIL: Source,
    INTIRL: Source,
    INTEW: Source,
}

export type GenerationSource = {
    dataset: string,
    publishTime: string,
    startTime: string,
    settlementDate: string,
    settlementPeriod: number,
    fuelType: "WIND" | "NUCLEAR" | "CCGT" | "BIOMASS" | "INTFR" | "INTVKL" | "INTNSL" | "INTNEM" | "INTIFA2" | "NPSHYD" | "OTHER" | "PS" | "COAL" | "INTELEC" | "INTGRNL" | "INTNED" | "OCGT" | "OIL" | "INTIRL" | "INTEW",
    generation: number
}

export type AppEnergySource = {
    id: string,
    name: string,
    type: string,
    generation: number
}

export type GridAPIResponse = {
    period: string,
    demmand: number,
    fossil: {
        gas: number,
        coal: number,
        oil: number,
        total: number
    },
    clean: {
        wind: number,
        solar: number,
        nuclear: number,
        biomass: number,
        hydro: number,
        total: number
    },
    storage: {
        pumped: number
    },
    other: number,
    interconnectors: {
        france: number,
        ireland: number,
        belgium: number,
        denmark: number,
        norway: number,
        total: number
    }
}

export type Energy = {
    name: string,
    kw: number,
    pc: string
}
export type Grid = {
    period: string,
    clean: Energy[],
    fossil: Energy[],
    imports: Energy[],
    exports: Energy[],
    totals: { import: number, export: number, clean: number, fossil: number, demmand: number }
  }

export type Generation = GenerationSource[]