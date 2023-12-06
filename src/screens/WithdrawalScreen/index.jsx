import React, {useContext} from "react";
import { ScrollView, Box, Center, VStack, Skeleton } from "native-base";
import THEME from "../../theme";
import EmptyState from "../../components/EmptyState";
import TransactionList from "../../components/TransactionList";
import {Context} from '../../context';

const WithdrawalScreen = ({ statusFilter, emptyState }) => {
  const { loading, withdrawals } = useContext(Context);

  let filteredWithdrawals;

  if (typeof statusFilter === "function") {
    filteredWithdrawals = withdrawals.filter(({ status }) =>
      statusFilter(status)
    );
  } else {
    filteredWithdrawals = withdrawals.filter(
      ({ status }) => status === statusFilter
    );
  }

  return (
    <ScrollView backgroundColor={THEME.COLORS.BLACK}>
      <Box flex="1" backgroundColor={THEME.COLORS.BLACK}>
        {loading ? (
          <Center w="100%">
            <VStack
              w="100%"
              space={4}
              overflow="hidden"
              rounded="md"
              marginTop="20px"
            >
              {[...Array(7)].map((_, index) => (
                <Skeleton
                  key={index}
                  h="20"
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
              ))}
            </VStack>
          </Center>
        ) : filteredWithdrawals.length > 0 ? (
          <TransactionList transactions={filteredWithdrawals} />
        ) : (
          <EmptyState {...emptyState} />
        )}
      </Box>
    </ScrollView>
  );
};

export default WithdrawalScreen;
