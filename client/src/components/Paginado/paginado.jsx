import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme, ThemeProvider, experimentalStyled as sx } from "@mui/material/styles";

// const customTheme = createTheme({
//   components: {
//     MuiPagination: {
//       styleOverrides: {
//         root: {
//           '& .MuiPaginationItem-root': {
//             color: 'white', // Change the color here to the desired color
//           },
//         },
//       },
//     },
//   },
// });

export default function Paginado({ currentPage, recipesPerPage, recipes, paginado }) {
  const totalPages = Math.ceil(recipes / recipesPerPage);

  const handlePageChange = (event, newPage) => {
    paginado(newPage);
  };

  return (
    // <ThemeProvider theme={customTheme}>
      <Stack spacing={2}>
        <Pagination
        className='bg-white rounded-full h-10 flex items-center justify-center' 
          count={totalPages}
          color='primary'
          sx={{color: "white"}}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => {
            if (item.type === 'previous') {
              return (
                <PaginationItem
                  {...item}
                  icon={<ArrowBackIcon />}
                  disabled={currentPage === 1}
                />
              );
            }
            if (item.type === 'next') {
              return (
                <PaginationItem
                  {...item}
                  icon={<ArrowForwardIcon />}
                  disabled={currentPage === totalPages}
                />
              );
            }
            return <PaginationItem {...item} />;
          }}
        />
      </Stack>
    // </ThemeProvider>
  );
}