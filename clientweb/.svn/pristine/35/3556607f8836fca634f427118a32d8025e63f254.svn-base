import React from 'react'
import Search from '../components/Search'
import CardItem from '../components/CardItem'
import { Grid, List } from '@material-ui/core'
import { useItem } from '../hooks/FuncMenuHook';
const Home = (props) => {
    const { submitFailes, history, location, initialize, handleSubmit, notification } = props
    const {
        data,
        textSearch,
        onSearch,
        onChangeSearch,
        goToPage,
        onKeyPress,
        dictionaryOptions,
        onInputChange,
        languageSelect,
        onChangeLanguageSelect
    } = useItem({ history })
    return (
        <Grid>
            <Grid item xs={12} justify="center" container>
                <Grid item xs={8}>
                    <Search
                        languageSelect={languageSelect} onChangeLanguageSelect={onChangeLanguageSelect}
                        textSearch={textSearch} onSearch={onSearch}
                        onChangeSearch={onChangeSearch} onKeyPress={onKeyPress}
                        dictionaryOptions={dictionaryOptions}
                        onInputChange={onInputChange}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3} justify="center" >
                {/* <Grid item xs={12} sm={0} /> */}
                <Grid item xs={12} sm={8} container spacing={3}>
                    {
                        data.map((item, i) => (
                            <CardItem goToPage={goToPage.bind(this, item.Link)} key={i} img={item.Image} name={item.Name} />
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;



