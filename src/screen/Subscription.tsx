import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import  {Toast}  from 'toastify-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { createSubscription, fetchUserSubscription } from '../api/SubscriptionApi';

import plans from '../data/Plandata'


type RootStackParamList = {
  PaymentCard: { url: string; session_id?: string };

};

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hasActiveSubscription , setHasActiveSubscription]=useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  useEffect(()=>{
    const fetchSubscription = async () => {
      try {
        const subscriptionData = await fetchUserSubscription();
        // console.log('subscriptionData', subscriptionData);
        
        if (subscriptionData.plan_type === 'premium') {
          
          setHasActiveSubscription(true);
        } else {
          setHasActiveSubscription(false);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchSubscription();
  },[])

 const handleSubscribe = async () => {
  if (!selectedPlan) {
    Toast.error('Please select a plan to subscribe.');
    return;
  }
  
   if (hasActiveSubscription) {
    Toast.info('You already have an active subscription.');
    return;
  }

  setIsLoading(true);
  try {
    const selectedPlanType = plans.find(plan => plan.id === selectedPlan)?.planType;

    if (!selectedPlanType) {
      throw new Error('Invalid plan selected');
    }

    const response = await createSubscription(selectedPlanType);
    const checkoutUrl = response.checkoutUrl || response.url;

    if (checkoutUrl) {
      Toast.success('Opening payment screen...');
      navigation.navigate('PaymentCard', { url: checkoutUrl, session_id: response.sessionId });
    } else {
      throw new Error('No checkout URL returned from server');
    }

  } catch (error: any) {
    Toast.error(error.message || 'Failed to create subscription');
  } finally {
    setIsLoading(false);
  }
};
  interface plan {
    id: string;
    title: string;
    price: string;
    planType: string;
    features: string[];
  }


  const renderPlan = (plan:plan): React.ReactElement => {
    const isSelected = selectedPlan === plan.id;
    const isHighlighted = plan.id === '7_days';
    const containerStyle = [
      styles.planContainer,
      isSelected && styles.selectedPlan,
    ];

    return (
      <TouchableOpacity
        key={plan.id}
        onPress={() => handleSelectPlan(plan.id)}
        style={containerStyle}>
        <LinearGradient
          colors={isHighlighted ? ['#ffd400', '#a47e1b'] : ['#1a1a1a', '#1a1a1a']}
          style={styles.gradientContainer}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>
          </View>
          {plan.features.map((feature: string, index: number) => (
            <Text style={styles.planFeature} key={index}>
              {feature}
            </Text>
          ))}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Choose Your Plan</Text>
        <Text style={styles.subheader}>
          Get unlimited access to all content
        </Text>
        {plans.map(renderPlan)}

        <TouchableOpacity
          onPress={handleSubscribe}
          style={styles.startButton}
          disabled={isLoading || hasActiveSubscription}>
          {isLoading || hasActiveSubscription ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Subscribe</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>Cancel anytime. No commitments.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ccc',
  },
  planContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  gradientContainer: {
    borderRadius: 12,
    padding: 20,
  },
  selectedPlan: {
    borderColor: '#ffd400',
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffe0',
  },
  planPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fafdf6',
  },
  planFeature: {
    fontSize: 14,
    marginVertical: 5,
    color: '#fffae5',
  },
  startButton: {
    backgroundColor: '#f0c14b',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 12,
    color: '#aaa',
  },
});

export default Subscription;
