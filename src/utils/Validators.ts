
export const nonEmptyValidator =
    (values: { [key: string]: string }): string[] => Object.entries(values)
        .reduce(
            (acc: string[], entry: [string, string]) => {
                const [key, value] = entry

                if (value.trim().length === 0) {
                    return acc.concat(`${key} cannot be empty`)
                } else {
                    return acc
                }
            },
            []
        )