import addressService from '../service/address.service';

export default {
    async getAddresses(req, res) {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Insira um endereço valido.' });
        }
        
        const { data } = await addressService.fetchAddresses({ q, limit: 5, min_confidence: 9 });
        
        const { results } = data;
        if (!results || !results.length) {
            return res.status(200).json([]);
        }

        const addresses = results.map(({ formatted, geometry }) => ({ address: formatted, geometry }));

        return res.status(200).json(addresses);
    }
}