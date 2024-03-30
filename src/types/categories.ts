interface Categories {
    _id: string,
    name: string,
    description: string,
    children: Categories[],
    isRoot: boolean,
    parentId?: string
}

interface FormPostCategory {
    name: string
    description: string
    isRoot?: boolean,
    parentId?: string
}


interface SubCategories {
    name: string
    description: string
    childSubCategories: {
        name: string,
        _id: string
    }
}

interface ChildSubCategories {
    name: string
    description: string
}

export type {
    Categories, SubCategories, ChildSubCategories, FormPostCategory
}