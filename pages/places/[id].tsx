import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

interface IPlaceProps {
    title: string;
    address: string;
}

export default function Place() {
    const router = useRouter();

    return (
        <Layout>
            <h1>{router.query.id}</h1>
            <p>Place.....</p>
        </Layout>
    );
}
