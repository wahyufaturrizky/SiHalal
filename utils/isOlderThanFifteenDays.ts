export const isOlderThan15Days = (dateString: any) => {
    const apiDate = new Date(dateString)
    const today = new Date()

    const fifteenDaysAgo = new Date()

    fifteenDaysAgo.setDate(today.getDate() - 15)

    return apiDate < fifteenDaysAgo
}