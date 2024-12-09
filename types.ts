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
    fuel: AppEnergySource[],
    interconnectors: { imports: AppEnergySource[], exports: AppEnergySource[] },
    totals: {
        generation: string,
        import: string,
        export: string,
        total: string
    },
    updated: string
}

export type Generation = GenerationSource[]