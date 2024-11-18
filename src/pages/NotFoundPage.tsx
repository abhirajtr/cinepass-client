import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700">
            <div className="text-center p-8 rounded-lg shadow-lg bg-muted max-w-lg">
                <Heart className="mx-auto text-accent h-24 w-24 mb-4" />
                <h1 className="text-4xl font-semibold text-foreground mb-4">Oops! Page Not Found</h1>
                <p className="text-lg text-foreground/80 mb-6">
                    The page you are looking for doesn’t exist or has been moved.
                </p>
                <Button
                    className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary-dark flex items-center justify-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <ArrowRight className="h-5 w-5" />
                    Go Back to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
