import { useEffect, useState } from 'react';

const useLocationData = (defaultDepartamento) => {
    const [municipios, setMunicipios] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [departamento, setDepartamento] = useState();
    const [municipio, setMunicipio] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json');
                const result = await response.json();
                const departamentosUnicos = Array.from(new Set(result.map(item => item.departamento)));
                setDepartamentos(departamentosUnicos);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        setDepartamento(defaultDepartamento);
    }, [defaultDepartamento]);

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const response = await fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json');
                const result = await response.json();
                const municipiosFiltrados = result.filter(item => item.departamento === departamento).map(item => item.municipio);
                setMunicipios(municipiosFiltrados);
                setMunicipio(municipios[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMunicipios();
    }, [departamento]);

    const handleDepartamentoChange = (nuevoDepartamento) => {
        setDepartamento(nuevoDepartamento);
    };

    return {
        municipios,
        departamentos,
        departamento,
        handleDepartamentoChange,
        municipio
    };
};

export default useLocationData;
