import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import theatreOwnerApi from '@/axiosInstance/theatreOwnerApi'

interface ViewDocumentModalProps {
    isOpen: boolean
    onClose: () => void
    verificationDocument: string
    theatreName: string
}

export const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ isOpen, onClose, verificationDocument, theatreName, }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [documentUrl, setDocumentUrl] = useState<string>("");

    useEffect(() => {
        const fetchDocumentUrl = async () => {
            setLoading(true);
            try {
                const response = await theatreOwnerApi.get("/theatre/get-presigned-url", {
                    params: { fileName : verificationDocument },
                });
                setDocumentUrl(response.data.responseData.documentUrl);
            } catch (error) {
                console.log(error);
                setError("Failed to fetch document URL. Please try again.");
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.responseMessage || "An unexpected error occured");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchDocumentUrl();
    }, [isOpen, verificationDocument]);

    useEffect(() => {
        if (isOpen) {
            setLoading(true)
            setError(null)
            // In a real application, you would make an API call here to get a fresh presigned URL
            // For this example, we'll simulate a delay
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }, [isOpen])

    // const handleDownload = () => {
    //     // In a real application, you would make an API call to get a fresh presigned URL for download
    //     // Then use that URL to trigger the download
    //     window.open(verificationDocument, '_blank')
    // }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] sm:h-[600px]">
                {/* <DialogHeader>
                    <DialogTitle>Verification Document - {theatreName}</DialogTitle>
                </DialogHeader> */}
                <div className="relative w-full h-full">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="absolute inset-0 flex items-center justify-center text-red-500">
                            {error}
                        </div>
                    ) : (
                        <iframe
                            src={`https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`}
                            className="w-full h-full border-none"
                            title={`Verification Document for ${theatreName}`}
                        />
                    )}
                </div>
                {/* <div className="flex justify-end mt-4">
                    <Button onClick={handleDownload} disabled={loading || !!error}>
                        Download
                    </Button>
                </div> */}
            </DialogContent>
        </Dialog>
    )
}

