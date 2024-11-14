import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import Title from '../../components/Title';
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import theatreOwnerApi from '../../axiosInstance/theatreOwnerApi';

interface AddTheatreFormValues {
    theatreName: string;
    contactEmail: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    verificationDocument: File | null;
}

const AddTheatre = () => {
    const ownerId = useSelector((state: RootState) => state.authReducer.userId)
    const initialValues: AddTheatreFormValues = {
        theatreName: '',
        contactEmail: '',
        phoneNumber: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        verificationDocument: null,
    };

    const validationSchema = Yup.object({
        theatreName: Yup.string().required('Theatre Name is required'),
        contactEmail: Yup.string().email('Invalid email format').required('Email is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
        streetAddress: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipCode: Yup.string()
            .matches(/^[0-9]{6}$/, 'Zip Code must be 6 digits')
            .required('Zip Code is required'),
        verificationDocument: Yup.mixed()
            .required("PDF verificationDocument is required")
            .test("fileFormat", "Only PDF files are allowed", (value) => {
                return value && (value as File).type === "application/pdf";
            })
            .test("fileSize", "File size should be less than 5MB", (value) => {
                return value && (value as File).size <= 5 * 1024 * 1024;
            }),

    });

    const onSubmit = async (values: AddTheatreFormValues) => {
        console.log('Form data:', values);

        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value as string | Blob);
            });
            formData.append("ownerId", ownerId as string);

            const response = await theatreOwnerApi.post(`/theatre/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            toast.success(response.data?.message);
        } catch (error) {
            const errorMessage = error instanceof AxiosError
                ? error?.response?.data?.message
                : "Something went wrong. Please try again.";
            toast.error(errorMessage);
            console.log(error);
        }
    };


    return (
        <>
            <div className='text-3xl'>
                <Title text1='Add' text2='Theatre' />
            </div>

            <div className="w-full">
                <p className="text-lg text-white-90 mb-6">Fill out the form below to add a new theatre</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="theatreName" className="block text-grey-75 mb-2">Theatre Name</label>
                                    <Field
                                        type="text"
                                        id="theatreName"
                                        name="theatreName"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                                        placeholder="Enter theatre name"
                                    />
                                    <ErrorMessage name="theatreName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="contactEmail" className="block text-grey-75 mb-2">Contact Email</label>
                                    <Field
                                        type="email"
                                        id="contactEmail"
                                        name="contactEmail"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white rounded-md focus:outline-none border border-grey-15 placeholder:text-grey-35 focus:ring-1 focus:ring-green-80"
                                        placeholder="Enter contact email"
                                    />
                                    <ErrorMessage name="contactEmail" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="phoneNumber" className="block text-grey-75 mb-2">Phone Number</label>
                                    <Field
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 placeholder:text-grey-35 focus:ring-green-80"
                                        placeholder="Enter phone number"
                                        maxLength={10}
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="streetAddress" className="block text-grey-75 mb-2">Street Address</label>
                                    <Field
                                        type="text"
                                        id="streetAddress"
                                        name="streetAddress"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 placeholder:text-grey-35 focus:ring-green-80"
                                        placeholder="Enter streetAddress address"
                                    />
                                    <ErrorMessage name="streetAddress" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="city" className="block text-grey-75 mb-2">City</label>
                                    <Field
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 placeholder:text-grey-35 focus:ring-green-80"
                                        placeholder="Enter city"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="state" className="block text-grey-75 mb-2">State</label>
                                    <Field
                                        type="text"
                                        id="state"
                                        name="state"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 placeholder:text-grey-35 focus:ring-green-80"
                                        placeholder="Enter state"
                                    />
                                    <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="zipCode" className="block text-grey-75 mb-2">Zip Code</label>
                                    <Field
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 placeholder:text-grey-35 focus:ring-green-80"
                                        placeholder="Enter zip code"
                                    />
                                    <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="w-full md:w-1/2 px-4 mb-4">
                                    <label htmlFor="verificationDocument" className="block text-grey-75 mb-2">Verification Document (PDF)</label>
                                    <input
                                        type="file"
                                        id="verificationDocument"
                                        name="verificationDocument"
                                        accept=".pdf"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                            setFieldValue("verificationDocument", file);
                                        }}
                                        className="w-full px-4 py-2 bg-grey-10 text-absolute-white border border-grey-15 rounded-md focus:outline-none focus:ring-1 focus:ring-green-80"
                                    />
                                    <ErrorMessage name="verificationDocument" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>

                            <div className='w-full py-2'>
                                <Button 
                                    className=' bg-green-60 text-grey-15 py-2 rounded-md hover:bg-green-80 transition duration-300'
                                    type='submit'
                                >
                                    Add Theatre
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default AddTheatre;
