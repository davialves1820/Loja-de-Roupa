import { CircularProgress } from '@mui/material'
import styles from '../loading/pages.module.css'

export default function Loading() {
    return (
        <div className={styles.loadingPageContainer}>
            <CircularProgress color='inherit' />
        </div>
    )
}