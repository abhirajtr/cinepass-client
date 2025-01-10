import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

interface PromotionCardProps {
    title: string
    description: string
    code: string
}

const PromotionCard = ({ title, description, code }: PromotionCardProps) => {
    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">{description}</p>
                <Badge variant="secondary" className="text-xs">
                    Use code: {code}
                </Badge>
            </CardContent>
        </Card>
    )
}

export function PromotionsSection() {
    const promotions = [
        {
            title: "Student Discount",
            description: "Get 20% off on all movie tickets with your student ID",
            code: "STUDENT20",
        },
        {
            title: "Family Package",
            description: "Buy 4 tickets and get 1 free for any family movie",
            code: "FAMILY5",
        },
        {
            title: "Midweek Special",
            description: "50% off on all tickets for shows between Tuesday and Thursday",
            code: "MIDWEEK50",
        },
    ]

    return (
        <section className="py-6">
            <div className="container">
                <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {promotions.map((promo) => (
                        <PromotionCard key={promo.title} {...promo} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PromotionsSection;