import es from './src/locales/es.json';

export default defineI18nConfig(() => (
        {
            legacy: false,
            locale: 'es',
            messages: {
            es: es
            }
        }
    )
)